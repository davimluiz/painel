import { ClassInfo, MediaInfo, MediaType } from '../types';

// Em uma aplicação real, você usaria variáveis de ambiente para estas URLs.
// Ex: const CSV_URL = process.env.BLOB_CSV_URL;
const CSV_URL = 'https://gist.githubusercontent.com/adrianosferreira/0978c7c1339c33be32c69435b67d56a7/raw/a08b33539b7d5668e27c1973f73c65c2f7823e20/classes_data.csv';

// A URL da mídia também viria de uma variável de ambiente.
// Pode ser uma imagem ou um vídeo.
const MEDIA_URL = 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4'; 

const parseCSV = (csvText: string): ClassInfo[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const entry = headers.reduce((obj, header, index) => {
      obj[header as keyof ClassInfo] = values[index]?.trim() || '';
      return obj;
    }, {} as Partial<ClassInfo>);
    return entry as ClassInfo;
  });
  return data;
};

export const fetchClassData = async (): Promise<ClassInfo[]> => {
  console.log("Buscando dados das aulas do Vercel Blob...");
  if (!CSV_URL) {
      throw new Error("A URL do CSV (BLOB_CSV_URL) não está configurada.");
  }
  
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`A resposta da rede não foi 'ok'. Status: ${response.status}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Erro ao buscar dados das aulas:", error);
    throw new Error("Não foi possível carregar o arquivo CSV.");
  }
};

const getMediaTypeFromUrl = (url: string): MediaType | null => {
    if (!url) return null;
    // Remove query parameters before getting the extension
    const extension = url.split('.').pop()?.split('?')[0].toLowerCase();
    if (!extension) return null;

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
        return 'image';
    }
    if (['mp4', 'webm', 'ogg'].includes(extension)) {
        return 'video';
    }
    return null;
}

export const fetchMediaData = async (): Promise<MediaInfo | null> => {
    console.log("Buscando dados de mídia do Vercel Blob...");
    if (!MEDIA_URL) {
        console.log("Nenhuma URL de mídia (BLOB_MEDIA_URL) configurada.");
        return null;
    }

    try {
        // Usamos um request HEAD para verificar se a mídia existe sem baixá-la inteira.
        const response = await fetch(MEDIA_URL, { method: 'HEAD' });
        if (!response.ok) {
            console.error(`Mídia não encontrada em ${MEDIA_URL}. Status: ${response.status}`);
            return null;
        }

        const mediaType = getMediaTypeFromUrl(MEDIA_URL);

        if (!mediaType) {
            console.warn(`Não foi possível determinar o tipo de mídia para a URL: ${MEDIA_URL}`);
            return null;
        }

        return {
            type: mediaType,
            url: MEDIA_URL,
            alt: 'Mídia institucional',
        };

    } catch (error) {
        console.error("Erro ao buscar dados da mídia:", error);
        // Não bloqueia a UI se a mídia falhar ao carregar, apenas retorna nulo.
        return null; 
    }
};
