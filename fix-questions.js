// Script to fix question IDs and verify types
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the questions file
const questionsPath = path.join(__dirname, 'server', 'data', 'questions.ts');
const questionsContent = fs.readFileSync(questionsPath, 'utf8');

// Extract the questions array using regex
const questionsMatch = questionsContent.match(/export const questions: Question\[\] = \[([\s\S]*?)\];/);
if (!questionsMatch) {
  console.error('Could not find questions array in file');
  process.exit(1);
}

let questionsString = questionsMatch[1];

// Split into individual question objects
const questionRegex = /\{\s*"id":\s*\d+,\s*"text":\s*"([^"]*)"\s*,\s*"type":\s*(\d+)\s*\}/g;
let match;
const questions = [];
let id = 1;

while ((match = questionRegex.exec(questionsString)) !== null) {
  const text = match[1];
  const type = parseInt(match[2], 10);
  
  // Skip empty texts or invalid types
  if (text.trim() === '' || isNaN(type) || type < 1 || type > 9) {
    console.log(`Skipping invalid question: ${match[0]}`);
    continue;
  }
  
  // Create new question with incremental ID
  questions.push({
    id,
    text,
    type
  });
  
  id++;
}

console.log(`Found ${questions.length} valid questions`);

// Count questions per type
const typeCount = {};
for (let i = 1; i <= 9; i++) {
  typeCount[i] = questions.filter(q => q.type === i).length;
}

console.log('Questions per type:');
console.log(typeCount);

// Generate new questions.ts file
const newQuestionsContent = `import { Question, EnneagramType } from "./types";

export const questions: Question[] = ${JSON.stringify(questions, null, 2)};

export const enneagramTypes: EnneagramType[] = [
  {
    id: 1,
    name: "De Perfectionist",
    description: "Type 1 streeft naar perfectie en doet wat juist is. Ze leven volgens strikte regels en hebben een sterk gevoel voor goed en kwaad.",
    strengths: [
      "Betrouwbaar en eerlijk",
      "Toegewijd aan het verbeteren van de wereld",
      "Streven naar hoge standaarden",
      "Georganiseerd en methodisch",
      "Rechtvaardige en principiële handelswijze"
    ],
    weaknesses: [
      "Kritisch naar zichzelf en anderen",
      "Moeite met fouten accepteren",
      "Kan rigide en inflexibel zijn",
      "Onderdrukt eigen impulsen en verlangens",
      "Heeft moeite met genieten en ontspannen"
    ]
  },
  {
    id: 2,
    name: "De Helper",
    description: "Type 2 richt zich op de behoeften van anderen en wil graag hulpvaardig, geliefd en gewaardeerd zijn.",
    strengths: [
      "Empathisch en warm",
      "Zorgzaam en ondersteunend",
      "Kan goed relaties opbouwen",
      "Intuïtief over de behoeften van anderen",
      "Positieve en optimistische houding"
    ],
    weaknesses: [
      "Heeft moeite 'nee' te zeggen",
      "Neigt naar emotionele manipulatie",
      "Verwaarloost eigen behoeften",
      "Kan overmatig bezitterig worden",
      "Heeft behoefte aan waardering en erkenning"
    ]
  },
  {
    id: 3,
    name: "De Presteerder",
    description: "Type 3 is resultaatgericht, efficiënt en streeft naar succes en erkenning van anderen.",
    strengths: [
      "Doelgericht en ambitieus",
      "Productief en efficiënt",
      "Aanpassingsvermogen",
      "Positieve en energieke uitstraling",
      "Excelleert in vele gebieden"
    ],
    weaknesses: [
      "Sterke focus op imago en status",
      "Workaholic-neigingen",
      "Vermijdt emotionele kwetsbaarheid",
      "Kan authenticiteit verliezen",
      "Meet zelfwaarde aan prestaties"
    ]
  },
  {
    id: 4,
    name: "De Individualist",
    description: "Type 4 is gevoelig, expressief en op zoek naar diepere betekenis en authenticiteit.",
    strengths: [
      "Creatief en expressief",
      "Emotionele diepgang",
      "Empathisch voor pijn en lijden",
      "Authentiek en eerlijk",
      "Waardering voor schoonheid en kunst"
    ],
    weaknesses: [
      "Gevoelig voor afwijzing en verlating",
      "Neiging tot melancholie",
      "Kan verstrikt raken in negatieve emoties",
      "Moeite met routine en praktische zaken",
      "Soms overdreven dramatisch of sentimenteel"
    ]
  },
  {
    id: 5,
    name: "De Waarnemer",
    description: "Type 5 zoekt kennis en inzicht en heeft behoefte aan privacy en onafhankelijkheid.",
    strengths: [
      "Analytisch en scherpzinnig",
      "Objectief en nuchter",
      "Innovatief denken",
      "Onafhankelijk en zelfredzaam",
      "Respect voor grenzen van anderen"
    ],
    weaknesses: [
      "Moeite met emotionele expressie",
      "Kan zich sociaal isoleren",
      "Vermijdt praktische verantwoordelijkheden",
      "Verzamelt kennis zonder actie",
      "Kan cynisch en afstandelijk worden"
    ]
  },
  {
    id: 6,
    name: "De Loyalist",
    description: "Type 6 is loyaal, verantwoordelijk en gericht op veiligheid en zekerheid.",
    strengths: [
      "Loyaal en toegewijd",
      "Anticiperend op problemen",
      "Verantwoordelijk en betrouwbaar",
      "Samenwerkingsgericht",
      "Beschermend naar dierbaren"
    ],
    weaknesses: [
      "Overmatig bezorgd en angstig",
      "Ambivalent bij beslissingen",
      "Wantrouwend naar autoriteit",
      "Worst-case-scenario denken",
      "Zoekt bevestiging en zekerheid"
    ]
  },
  {
    id: 7,
    name: "De Enthousiast",
    description: "Type 7 is spontaan, veelzijdig en op zoek naar positieve ervaringen en avontuur.",
    strengths: [
      "Optimistisch en enthousiast",
      "Veelzijdig en creatief",
      "Spontaan en speels",
      "Toekomstgericht",
      "Avontuurlijk en energiek"
    ],
    weaknesses: [
      "Moeite met focus en discipline",
      "Vermijdt pijn en ongemak",
      "Kan oppervlakkig overkomen",
      "Impulsief en rusteloos",
      "Overcommitment aan activiteiten"
    ]
  },
  {
    id: 8,
    name: "De Uitdager",
    description: "Type 8 is zelfverzekerd, direct en streeft naar controle en onafhankelijkheid.",
    strengths: [
      "Zelfverzekerd en assertief",
      "Beschermend naar zwakkeren",
      "Direct en eerlijk",
      "Besluitvaardig en daadkrachtig",
      "Leiderschap en moed"
    ],
    weaknesses: [
      "Kan intimiderend en dominant zijn",
      "Moeite met kwetsbaarheid tonen",
      "Confronterend en ongeduldig",
      "Controlerend naar omgeving",
      "Kan buitensporig reageren"
    ]
  },
  {
    id: 9,
    name: "De Vredestichter",
    description: "Type 9 is kalm, geduldig en streeft naar harmonie en het vermijden van conflict.",
    strengths: [
      "Vredestichtend en bemiddelend",
      "Geduldig en begripvol",
      "Accepterend en niet-oordelend",
      "Ontspannen en kalme aanwezigheid",
      "Ziet verschillende perspectieven"
    ],
    weaknesses: [
      "Vermijdt confrontatie en conflict",
      "Kan passief en besluiteloos zijn",
      "Minimaliseert eigen behoeften",
      "Afgeleid en verstrooid",
      "Moeite met prioriteiten stellen"
    ]
  }
];
`;

fs.writeFileSync(questionsPath, newQuestionsContent);
console.log('Successfully updated questions.ts with fixed IDs');