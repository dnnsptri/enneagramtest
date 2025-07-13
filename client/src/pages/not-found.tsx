
import ErrorDisplay from "@/components/ErrorDisplay";

export default function NotFound() {
  return (
    <ErrorDisplay
      title="404 Pagina Niet Gevonden"
      message="De pagina die je zoekt bestaat niet"
      code="404"
    />
  );
}
