import { randomUUID } from 'node:crypto';

import { PrismaClient } from '@prisma/client';

import {PostStatus, PostType} from '@project/lib/shared/app/types';

const userIds = ['507f191e810c19729de860ea', '507f1f77bcf86cd799439011'];
const LIKE_COUNT = 3;

function getRandomIds(length: number): string[] {
  return Array.from({length}, () => randomUUID());
}

function getRandomNumber(min: number, max: number): number {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber) ;
}

function getTags() {
  return [
    {tag: '#походвгоры#заповедник#вода#кавказ'},
    {tag: '#живопись#творчество#пейзаж#лес'},
    {tag: '#библиотека#книги#девушка#'},
    {tag: '#кот#кошки#кошка#длядетей#котята'},
    {tag: '#библиотека#книги#кошка#рамкафото#перо#чернила#фэнтези#кубок'}
  ]
}

function getLinks() {
  return [
    {
      url: '',
      description: ''
    },
    {
      url: '',
      description: ''
    },
    {
      url: '',
      description: ''
    }
  ]
}

function getPhotos() {
  return [
    {image: ''},
    {image: ''},
    {image: ''}
  ]
}

function getQuotes() {
  return [
    {
      author: 'Альберт Эйнштейн',
      content: 'Жизнь похожа на езду на велосипеде. Чтобы сохранить равновесие, ты должен продолжать двигаться.'
    },
    {
      author: 'Фёдор Достоевский',
      content: 'Надо любить жизнь больше, чем сам смысл жизни!'
    },
    {
      author: 'Форрест Гамп (1994)',
      content: 'Жизнь похожа на коробку шоколадных конфет; никогда не знаешь, что получишь'
    }
  ]
}

function getTexts() {
  return [
    {
      title: '',
      preview: '',
      content: ''
    },
    {
      title: '',
      preview: '',
      content: ''
    },
    {
      title: '',
      preview: '',
      content: ''
    }
  ]
}

function getVideos() {
  return [
    {
      title: '',
      url: 'https://dareful.com/flying-over-water/'
    },
    {
      title: '',
      url: 'https://dareful.com/free-4k-time-lapse-stock-video-tokyo-japan-sunrise/'
    },
    {
      title: '',
      url: 'https://dareful.com/foggy-mountain-landscape/'
    }
  ]
}

function getPublications() {
  return [
    {
      type: PostType.Photo,
      status: PostStatus.Published,
      repost: false
    },
    {
      type: PostType.Link,
      status: PostStatus.Published,
      repost: false
    },
    {
      type: PostType.Quote,
      status: PostStatus.Published,
      repost: false
    },
    {
      type: PostType.Text,
      status: PostStatus.Published,
      repost: false
    },
    {
      type: PostType.Video,
      status: PostStatus.Draft,
      repost: false
    }
  ]
}

function getComments() {
  return [
    {content: ''},
    {content: ''},
    {content: ''}
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const tags = getTags();
  const tagIds = getRandomIds(tags.length);

  tags.forEach(async(item, index) => {
    await prismaClient.tags.create({
      data: {
        tagId: tagIds[index],
        tag: item.tag
      }
    })
  });

  const links = getLinks();
  const linkIds = getRandomIds(links.length);

  links.forEach(async(item, index) => {
    await prismaClient.links.create({
      data: {
        linkId: linkIds[index],
        url: item.url,
        description: item.description
      }
    })
  });

  const photos = getPhotos();
  const photoIds = getRandomIds(photos.length);

  photos.forEach(async(item, index) => {
    await prismaClient.images.create({
      data: {
        photoId: photoIds[index],
        image: item.image
      }
    })
  });

  const quotes = getQuotes();
  const quoteIds = getRandomIds(quotes.length);

  quotes.forEach(async(item, index) => {
    await prismaClient.quotes.create({
      data: {
        quoteId: quoteIds[index],
        author: item.author,
        content: item.content
      }
    })
  });

  const texts = getTexts();
  const textIds = getRandomIds(texts.length);

  texts.forEach(async(item, index) => {
    await prismaClient.texts.create({
      data: {
        textId: textIds[index],
        title: item.title,
        preview: item.preview,
        content: item.content
      }
    })
  });

  const videos = getVideos();
  const videoIds = getRandomIds(videos.length);

  videos.forEach(async(item, index) => {
    await prismaClient.videos.create({
      data: {
        videoId: videoIds[index],
        title: item.title,
        url: item.url
      }
    })
  });

  const publications = getPublications();
  const publicationIds = getRandomIds(publications.length);

  publications.forEach(async(item, index) => {
    await prismaClient.publications.create({
      data: {
        publicationId: publicationIds[index],
        type: item.type,
        status: item.status,
        repost: item.repost,
        userId: userIds[getRandomNumber(0, userIds.length)],
        [`${item.type}Id`]: eval(`${item.type}Ids`)[getRandomNumber(0, eval(`${item.type}s`).length)]
      }
    })
  });

  const result = await prismaClient.publications.findUnique({
    where: {
      publicationId: publicationIds[getRandomNumber(0, publicationIds.length)]
    }
  });

  await prismaClient.publications.create({
    data: {
      ...result,
      publicationId: randomUUID(),
      repost: true,
      userId: userIds[getRandomNumber(0, userIds.length)],
      originalUserId: result.userId,
      originalPublicationId: result.publicationId
    }
  })

  const comments = getComments();
  const commentIds = getRandomIds(comments.length);

  comments.forEach(async(item, index) => {
    await prismaClient.comments.create({
      data: {
        commentId: commentIds[index],
        content: item.content
      }
    })
  });

  const likeIds = getRandomIds(LIKE_COUNT);

  for(let i = 0; i < LIKE_COUNT; i++) {
    await prismaClient.likes.create({
      data: {
        likeId: likeIds[i],
        publicationId: publicationIds[getRandomNumber(0, publicationIds.length)],
        userId: userIds[getRandomNumber(0, userIds.length)],
      }
    })
  }
}
