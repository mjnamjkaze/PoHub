export interface Movie {
  id: number;
  title: string;
  description?: string;
  year?: number;
  genre?: string;
  runtime?: number;
  imdbRating?: number;
  posterUrl?: string;
  backdropUrl?: string;
  isSeries: boolean;
  viewCount: number;
  createdAt: string;
  episodes?: Episode[];
  driveFiles?: GoogleDriveFile[];
}

export interface Episode {
  id: number;
  movieId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description?: string;
  runtime?: number;
  thumbnailUrl?: string;
  driveFiles?: GoogleDriveFile[];
}

export interface GoogleDriveFile {
  id: number;
  fileId: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  resolution?: string;
  duration?: number;
  quality?: string;
  fileType: FileType;
  subtitleFileId?: string;
  movieId?: number;
  episodeId?: number;
}

export enum FileType {
  Video = 0,
  Subtitle = 1,
  Poster = 2,
  Backdrop = 3,
  Thumbnail = 4
}

export interface WatchHistory {
  id: number;
  userId: number;
  movieId?: number;
  episodeId?: number;
  currentPosition: number;
  totalDuration: number;
  isCompleted: boolean;
  lastWatchedAt: string;
  movie?: Movie;
  episode?: Episode;
}

export interface StreamingResponse {
  streamingUrl: string;
  metadata: {
    id: string;
    name: string;
    size: number;
    mimeType: string;
    duration?: number;
    width?: number;
    height?: number;
    resolution?: string;
  };
}
