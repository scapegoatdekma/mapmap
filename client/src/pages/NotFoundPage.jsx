import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import PageShell from "../shared/ui/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell title="404" subtitle="Страница не найдена">
      <Result
        status="404"
        title="Такой страницы нет."
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </PageShell>
  );
}
