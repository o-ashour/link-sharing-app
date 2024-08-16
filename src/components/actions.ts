'use server'

import { Link, ProfileInfo } from "@/types";
import { sql } from "@vercel/postgres";
import { z } from 'zod';

const getUserProfileInfo = async (userId: string | null) => {
  try {
    const result = await sql`SELECT * FROM Users WHERE ${userId} = user_id;`;
    return {
      firstName: { value: Boolean(result.rows[0].first_name) ? result.rows[0].first_name : '', errors: [''] },
      lastName: { value: Boolean(result.rows[0].last_name) ? result.rows[0].last_name : '', errors: [''] },
      email: { value: Boolean(result.rows[0].email) ? result.rows[0].email : '', errors: [''] },
      profilePicUrl: { value: Boolean(result.rows[0].profile_pic_url) ? result.rows[0].profile_pic_url : '', errors: [''] },
    }
  } catch (error) {
    throw new Error('Failed to fetch user profile info');
  }
}

const getUserLinks = async (userId: string | null) => {
  try {
    const result = await sql`SELECT id, platform_name, url FROM links WHERE ${userId} = user_id ORDER BY index;`;
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
    throw new Error('Failed to fetch user links');
  }
}

export const getUserData = async (userId: string | null) => {
  let links = [];
  let profileInfo = {
    firstName: { value: '', errors: [''] },
    lastName: { value: '', errors: [''] },
    email: { value: '', errors: [''] },
    profilePicUrl: { value: '', errors: [''] },
  };
  try {
    links = await getUserLinks(userId);
  } catch (error) {
    throw new Error('Failed to fetch user links')
  }
  try {
    profileInfo = await getUserProfileInfo(userId);
  } catch (error) {
    throw new Error('Failed to fetch user profile info')
  }
  return { links, profileInfo }
}

export const saveLinks = async (links: Link[], userId: string | null) => {
  const schema = z.array(z.object({
    id: z.number(),
    platform: z.string(),
    url: z.string().url(),
  }))

  const parse = schema.safeParse(links);
  if (!parse.success) {
    return {
      errors: parse.error?.flatten().fieldErrors,
    }
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
          return sql`INSERT INTO links(id, user_id, index, platform_name, url) VALUES (${link.id}, ${userId}, ${idx + 1}, ${link.platform}, ${link.url});`;
        } catch (error) {
          throw new Error('Failed to create new link')
        }
      } else {
        try {
          return sql`UPDATE links SET index = ${idx + 1}, platform_name = ${link.platform}, url = ${link.url} WHERE ${link.id} = id;`;
        } catch (error) {
          throw new Error('Failed to update link')
        }
      }
    })
    await Promise.all(promises);
  } catch (error) {
    throw new Error('Failed to fetch link count');
  }
  
  // delete links removed in UI
  try {
    const linkIds = data.map(link => link.id);
    const result = await sql`SELECT * FROM links WHERE ${userId} = user_id`;
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
    throw new Error('Failed to fetch links')
  }
  return;
}

export const clearLinksInStore = async (userId: string | null) => {
  try {
    await sql`DELETE FROM links WHERE user_id = ${userId};`;
  } catch (error) {
    throw new Error('Failed to clear links');
  }
}

export const storeNewUser = async (email: string, userId: string | null) => {
  const schema = z.object({
    email: z.string().email(),
  })

  const parse = schema.safeParse({ email });
  if (!parse.success) {
    return {
      errors: parse.error?.flatten().fieldErrors,
    }
  }

  try {
    await sql`INSERT INTO users(user_id, email) VALUES (${userId}, ${email})`;
  } catch (error) {
    throw new Error('Failed to store user info')
  }
  return;
}

export const saveProfileInfo = async (profileInfo: ProfileInfo, userId: string | null) => {
  const schema = z.object({
    userId: z.string().uuid(),
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    email: z.string().email().optional().nullable(),
    profilePicUrl: z.string().url().optional().nullable(),
  });

  const email = (typeof (profileInfo.email.value) === 'string' && !profileInfo.email.value) ? undefined : profileInfo.email.value;
  const profilePicUrl = (typeof (profileInfo.profilePicUrl.value) === 'string' && !profileInfo.profilePicUrl.value) ? undefined : profileInfo.profilePicUrl.value;

  const parse = schema.safeParse({
    userId,
    firstName: profileInfo.firstName.value,
    lastName: profileInfo.lastName.value,
    email,
    profilePicUrl,
  })

  if (!parse.success) {
    return {
      errors: parse.error?.flatten().fieldErrors,
    }
  }

  const data = parse.data;

  // store in db
  try {
    await sql`UPDATE users SET first_name = ${data.firstName}, last_name = ${data.lastName}, email = ${data.email}, profile_pic_url = ${data.profilePicUrl} WHERE user_id = ${data.userId}`;
  } catch (error) {
    throw new Error('Failed to update profile info')
  }

  try {
    const user = await sql`SELECT * FROM Users WHERE ${data.userId} = user_id;`;
    const nextProfileInfo = {
      firstName: { value: user.rows[0].first_name, errors: [''] },
      lastName: { value: user.rows[0].last_name, errors: [''] },
      email: { value: user.rows[0].email || '', errors: [''] },
      profilePicUrl: { value: user.rows[0].profile_pic_url, errors: [''] },
    }
    return { data: nextProfileInfo };
  } catch (error) {
    throw new Error('Failed to fetch user data')
  }
}