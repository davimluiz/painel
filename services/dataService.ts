import { ClassInfo, MediaInfo } from '../types';

// This is mock data. In a real application, you would fetch this from a URL.
const MOCK_CSV_DATA = `sala,turma,instrutor,unidade_curricular,inicio,fim
Laboratório 01,Téc. em Redes,João Silva,Segurança de Redes,08:00,10:00
Oficina Mecânica,Mecânica Automotiva,Carlos Pereira,Sistemas de Freios,08:00,12:00
Sala 10,Design Gráfico,Ana Costa,Teoria das Cores,10:00,12:00
Laboratório 03,Desenvolvimento Web,Mariana Lima,React Avançado,13:30,15:30
Estúdio de Foto,Fotografia Digital,Ricardo Alves,Iluminação de Estúdio,13:30,17:30
Sala 05,Téc. em Edificações,Fernanda Souza,Desenho Técnico,15:30,17:30
Laboratório 02,Ciência de Dados,Pedro Martins,Machine Learning,19:00,21:00
Sala 12,Gestão de Projetos,Camila Rocha,Metodologias Ágeis,19:00,22:00`;

// In a real application, you would use this variable from your environment.
// const CSV_URL = process.env.BLOB_CSV_URL;

const parseCSV = (csvText: string): ClassInfo[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const entry = headers.reduce((obj, header, index) => {
      obj[header as keyof ClassInfo] = values[index].trim();
      return obj;
    }, {} as Partial<ClassInfo>);
    return entry as ClassInfo;
  });
  return data;
};

export const fetchClassData = async (): Promise<ClassInfo[]> => {
  console.log("Fetching class data...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // In a real app:
        // const response = await fetch(CSV_URL);
        // if (!response.ok) throw new Error('Network response was not ok');
        // const csvText = await response.text();
        // resolve(parseCSV(csvText));
        
        // Using mock data:
        if (Math.random() > 0.9) { // Simulate a fetch error occasionally
             reject(new Error("Não foi possível carregar o arquivo CSV."));
        } else {
            const data = parseCSV(MOCK_CSV_DATA);
            resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    }, 1500); // Simulate network delay
  });
};


export const fetchMediaData = async (): Promise<MediaInfo | null> => {
    console.log("Fetching media data...");
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate fetching the latest media. Can be an image or video.
            const mediaOptions: (MediaInfo | null)[] = [
                { type: 'image', url: 'https://picsum.photos/seed/school/800/600', alt: 'Anúncio institucional' },
                { type: 'video', url: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4', alt: 'Vídeo institucional da escola' },
                null, // Simulate no media available
            ];
            resolve(mediaOptions[Math.floor(Math.random() * mediaOptions.length)]);
        }, 1800); // Simulate network delay
    });
};
