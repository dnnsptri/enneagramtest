import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Result } from "@shared/schema";
import type { EnneagramType } from "@shared/types";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface ResultsPDFProps {
  result: Result;
  primaryType: EnneagramType;
  secondaryType?: EnneagramType;
  tertiaryType?: EnneagramType;
}

export const ResultsPDF = ({ result, primaryType, secondaryType, tertiaryType }: ResultsPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Enneagram Test Resultaat</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Type {primaryType.id} - {primaryType.name}</Text>
        <Text style={styles.text}>{primaryType.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Sterke punten</Text>
        <View style={styles.list}>
          {primaryType.strengths.map((strength, i) => (
            <Text key={i} style={styles.listItem}>• {strength}</Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Uitdagingen</Text>
        <View style={styles.list}>
          {primaryType.weaknesses.map((weakness, i) => (
            <Text key={i} style={styles.listItem}>• {weakness}</Text>
          ))}
        </View>
      </View>

      {secondaryType && tertiaryType && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Je Tri-Type</Text>
          <Text style={styles.text}>
            Primair: Type {primaryType.id} - {primaryType.name}
          </Text>
          <Text style={styles.text}>
            Secundair: Type {secondaryType.id} - {secondaryType.name}
          </Text>
          <Text style={styles.text}>
            Tertiair: Type {tertiaryType.id} - {tertiaryType.name}
          </Text>
          <Text style={styles.text}>
            Je tri-type toont je dominante patronen in elk centrum van intelligentie: hoofd, hart en lichaam.
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.text}>Datum: {new Date(result.timestamp).toLocaleDateString('nl-NL')}</Text>
      </View>
    </Page>
  </Document>
);
