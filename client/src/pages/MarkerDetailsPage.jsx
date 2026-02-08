import PageShell from "../shared/ui/PageShell";
import { useParams } from "react-router-dom";

export default function MarkerDetailsPage() {
  const { id } = useParams();

  return (
    <PageShell
      title={`Метка #${id}`}
      subtitle="Карточка метки: координаты, фото, статьи, мероприятия."
    >
      <div>Тут будет подробная карточка метки.</div>
    </PageShell>
  );
}
