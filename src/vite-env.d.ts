/// <reference types="vite/client" />
interface userStats {
  size: number;
  category: string;
  known: number;
  unkown: number;
  undiscovered: number;
}
interface question {
  id: number;
  content: string;
  correct_answer: string;
  category: string;
  media: string | null;
  mediaID: string | null;
}
interface questionLoad extends question {
  mediaBlob: Promise<Blob | undefined> | null | undefined | Blob;
}
interface questionWithMedia extends questionLoad {
  media: string;
  mediaID: string;
  mediaBlob: Promise<Blob | undefined> | undefined | Blob;
}
enum questionsLoadingPhases {
  empty,
  taken,
}
