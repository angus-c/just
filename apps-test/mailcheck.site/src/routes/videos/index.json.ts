import fetchData from './_videos';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const response = await fetchData();
  let videos;
  try {
    videos = response.items.map((video: any) => {
      const date = new Date(video.snippet.publishedAt);
      const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const publishedAt = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
      return {
        id: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        desc: video.snippet.description,
        date: publishedAt
      };
    });
  } catch {
    console.error('Youtube api error: ', response);
  }

  return {
    body: videos
  };
};
