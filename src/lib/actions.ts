'use server'

import { ShareLink, ProfileInfo, SignInFormData, SignUpFormData, signInSchema, signUpSchema } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { LinkShareSupportedPlatforms } from "@/config";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { getUser } from "@/lib/dal";

const getUserId = async (email: string) => {
  try {
    const result = await sql`SELECT id FROM Users WHERE ${email} = email`;
    const userId = result.rows[0].id;
    return userId;
  } catch (error) {
    console.error('Failed to fetch user id:', error);
    throw new Error('Failed to fetch user id');
  }
}

const getUserProfileInfo = async () => {
  const user = await getUser();
  try {
    const result = await sql`SELECT * FROM Users WHERE ${user?.id} = id;`;
    return {
      firstName: { value: Boolean(result.rows[0].first_name) ? result.rows[0].first_name : '', errors: [''] },
      lastName: { value: Boolean(result.rows[0].last_name) ? result.rows[0].last_name : '', errors: [''] },
      email: { value: Boolean(result.rows[0].email) ? result.rows[0].email : '', errors: [''] },
      profilePicUrl: { value: Boolean(result.rows[0].profile_pic_url) ? result.rows[0].profile_pic_url : '', errors: [''] },
    }
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user profile info');
  }
}

const getUserLinks = async () => {
  const user = await getUser();
  try {
    const result = await sql`SELECT id, platform_name, url FROM links WHERE ${user?.id} = user_id ORDER BY index;`;
    const rows = result.rows;
    const links = rows.map(row => {
      return {
        id: parseInt(row.id),
        platform: row.platform_name,
        url: row.url,
        status: { isError: false, message: '' }
      }
    })
    return links;
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user links');
  }
}

export const getUserData = async () => {
  const links = await getUserLinks();
  const profileInfo = await getUserProfileInfo();
  return { links, profileInfo }
}

export const saveLinks = async (links: ShareLink[]) => {
  const user = await getUser();
  const schema = z.array(z.object({
    id: z.number(),
    platform: z.nativeEnum(LinkShareSupportedPlatforms),
    url: z.string().url(),
  }))

  const parse = schema.safeParse(links);

  if (!parse.success) {
    const errors: string[] = ['Failed to save changes'];
    const nextLinks: ShareLink[] = [];
    parse.error.issues.forEach((issue) => {
      if (issue.path[1] === 'url' && typeof(issue.path[0]) === 'number') {
        errors.push("Link #" + (issue.path[0] + 1) + ": " + issue.message + ' (check ' + issue.path[1] + '). ')
        const nextLink = { ...links[issue.path[0]], status: { isError: true, message: issue.message }};
        nextLinks.push(nextLink);       
      }
    })
    return { errors, nextLinks };
  }

  const data = parse.data;

  // create or update links 
  try {
    const promises = data.map(async (link, idx) => {
      let doesLinkRecordExist = false;
      const result = await sql`SELECT COUNT(id) FROM links WHERE ${link.id} = id;`;
      doesLinkRecordExist = Boolean(parseInt(result.rows[0].count));
      if (!doesLinkRecordExist) {
        try {
          return sql`INSERT INTO links(id, user_id, index, platform_name, url) VALUES (${link.id}, ${user?.id}, ${idx + 1}, ${link.platform}, ${link.url});`;
        } catch (error) {
          throw new Error('Failed to create new link')
        }
      } else {
        try {
          return sql`UPDATE links SET index = ${idx + 1}, platform_name = ${link.platform}, url = ${link.url} WHERE ${link.id} = id;`;
        } catch (error) {
          console.error('Database error:', error)
          throw new Error('Failed to update link')
        }
      }
    })
    await Promise.all(promises);
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch link count');
  }
  
  // delete links removed in UI
  try {
    const linkIds = data.map(link => link.id);
    const result = await sql`SELECT * FROM links WHERE ${user?.id} = user_id`;
    const links = result.rows;
    const promises = links.map(link => {
      if (!linkIds.includes(parseInt(link.id))) {
        try {
          return sql`DELETE FROM links WHERE id = ${link.id};`;
        } catch (error) {
          throw new Error('Failed to delete link')
        }
      }
    })
    await Promise.all(promises);
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch links')
  }
  return;
}

export const clearLinksInStore = async () => {
  const user = await getUser();
  try {
    await sql`DELETE FROM links WHERE user_id = ${user?.id};`;
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to clear links');
  }
}

export const storeNewUser = async (data: SignUpFormData) => {
  const parse = signUpSchema.safeParse(data);
  if (!parse.success) {
    return {
      errors: parse.error?.flatten().fieldErrors,
    }
  }

  const hashedPassword = await bcrypt.hash(parse.data.confirmPassword, 10);

  try {
    await sql`INSERT INTO users (email, password) VALUES (${parse.data.email}, ${hashedPassword})`;
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to create new user')
  }

  const userId = await getUserId(parse.data.email);

  await createSession(userId);
  redirect('/profile');
}

export const saveProfileInfo = async (profileInfo: ProfileInfo) => {
  const user = await getUser();
  const schema = z.object({
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    email: z.string().email().min(1).nullable(),
    profilePicUrl: z.string().url().optional().nullable(),
  });

  const email = (typeof (profileInfo.email.value) === 'string' && !profileInfo.email.value) ? undefined : profileInfo.email.value;
  const profilePicUrl = (typeof (profileInfo.profilePicUrl.value) === 'string' && !profileInfo.profilePicUrl.value) ? undefined : profileInfo.profilePicUrl.value;

  const parse = schema.safeParse({
    firstName: profileInfo.firstName.value,
    lastName: profileInfo.lastName.value,
    email,
    profilePicUrl,
  })

  if (!parse.success) {
    const errors = ['Failed to save changes'];
    const nextProfileInfo = {...profileInfo};
    parse.error.issues.forEach((issue) => {
      if (issue.path[0] === 'firstName') {
        errors.push(`First name: ${issue.message}`);
        nextProfileInfo.firstName.errors = [issue.message];
      } else if (issue.path[0] === 'lastName') {
        errors.push(`Last name: ${issue.message}`);
        nextProfileInfo.lastName.errors = [issue.message];
      } else if (issue.path[0] === 'email') {
        errors.push(`Email: ${issue.message}`);
        nextProfileInfo.email.errors = [issue.message];
      }
    })
    return { errors, nextProfileInfo }
  }

  const data = parse.data;
  let isEmailChanged = false;

  try {
    const savedEmail = await sql`SELECT email FROM Users WHERE ${user?.id} = id;`;
    if (data.email !== savedEmail.rows[0].email) {
      isEmailChanged = true;
    }
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user email')
  }

  // store in db
  try {
    await sql`UPDATE users SET first_name = ${data.firstName}, last_name = ${data.lastName}, email = ${data.email}, profile_pic_url = ${data.profilePicUrl} WHERE id = ${user?.id}`;
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to update profile info')
  }

  try {
    const userInfo = await sql`SELECT * FROM Users WHERE ${user?.id} = id;`;
    const nextProfileInfo = {
      firstName: { value: userInfo.rows[0].first_name, errors: [''] },
      lastName: { value: userInfo.rows[0].last_name, errors: [''] },
      email: { value: userInfo.rows[0].email || '', errors: [''] },
      profilePicUrl: { value: userInfo.rows[0].profile_pic_url, errors: [''] },
    }
    return { data: { nextProfileInfo, isEmailChanged } };
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user data')
  }
}

export const logout = () => {
  deleteSession();
}

export async function login(formData: SignInFormData) {
  const validatedFields = signInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await sql`SELECT * FROM Users WHERE email = ${validatedFields.data.email};`;

  // if no user found, return early
  if (!user.rows[0]) {
    return {
      errors: {
        email: ['Invalid credentials'],
      }
    };
  }
  const storedPassword = user.rows[0].password;
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    storedPassword,
  );
  if (!passwordMatch) {
    return {
      errors: {
        password: ['Invalid credentials'],
      }
    };
  }
  const userId = user.rows[0].id.toString();
  await createSession(userId);
}