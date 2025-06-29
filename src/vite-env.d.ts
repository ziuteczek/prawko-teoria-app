/// <reference types="vite/client" />
interface userStats {
  size: number;
  category: string;
  known: number;
  unknown: number;
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
interface questionMediaPromise extends question {
  mediaBlob: Promise<Blob | null> | null;
  isLoaded: boolean;
}
interface questionMediaBlob extends questionMediaPromise {
  mediaBlob: Blob;
}
interface currQuestionObjWithLoadedMedia extends questionWithLoadedMedia {
  mediaBlobURL: string;
}
interface questionNoMedia extends questionLoad {
  media: null;
  mediaID: null;
  mediaBlob: null;
}

