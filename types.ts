export interface ClassInfo {
  sala: string;
  turma: string;
  instrutor: string;
  unidade_curricular: string;
  inicio: string;
  fim: string;
}

export type MediaType = 'image' | 'video';

export interface MediaInfo {
  type: MediaType;
  url: string;
  alt: string;
}
