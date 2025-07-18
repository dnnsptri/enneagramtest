import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 4 },
});

export default function ResultsPDF({ result, enneagramTypes }) {
  const primary = enneagramTypes.find(t => t.id === result.primaryType);
  const secondary = enneagramTypes.find(t => t.id === result.secondaryType);
  const tertiary = enneagramTypes.find(t => t.id === result.tertiaryType);

  // Calculate percentages for all types
  const total = result.scores.reduce((sum, s) => sum + s, 0) || 1;
  const getPercent = (idx) => Math.round(((result.scores[idx] || 0) / total) * 100);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Enneagram Resultaat</Text>
          <Text style={styles.text}>Primair type: {primary?.name} ({getPercent(primary?.id - 1)}%)</Text>
          <Text style={styles.text}>{primary?.description}</Text>
          <Text style={styles.text}>Secundair type: {secondary?.name} ({getPercent(secondary?.id - 1)}%)</Text>
          <Text style={styles.text}>{secondary?.description}</Text>
          <Text style={styles.text}>Tertiair type: {tertiary?.name} ({getPercent(tertiary?.id - 1)}%)</Text>
          <Text style={styles.text}>{tertiary?.description}</Text>
        </View>
      </Page>
    </Document>
  );
} 