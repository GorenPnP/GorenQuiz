
export interface DetailQuestion {
  answers: PlainAnswerPart[];
  files: File[];
  userFiles: File[];
  meta: Metadata;
  question: QuestionPart;
}

interface PlainAnswerPart {
  text: string;
  audio: string;
  images: string[];
  chosen: boolean;
  answer: string;
}

export interface File {
  path: string;
  title: string;
  mimeType: string;
}

interface Metadata {
  subject: string;
  topic: string;
  grade: number;
  bundle: string;
  points: number;
}

interface QuestionPart {
  text: string;
  images: string[];
  audio: string;
}

const MimeTypes: string[] = [
  'application/msexcel',
  'application/mspowerpoint',
  'application/msword',

  'application/pdf',

  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  'application/xhtml+xml',   // for links to websites
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',    // maybe, size is usually too big
  'image/bmp',
  'image/x-bmp',
  'image/x-ms-bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',

  'text/plain',   // open popup or sth. with content

  'video/mp4',
  'video/ogg',
  'video/webm'
];

export function checkMimeType(mime: string): boolean {
  return mime in MimeTypes;
}
