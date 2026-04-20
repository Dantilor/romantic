import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <Container size="sm">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
            404
          </span>
          <h1 className="font-serif text-5xl text-ink">Этой страницы здесь нет</h1>
          <p className="max-w-sm text-ink-soft">
            Но есть много других — все они ждут тебя.
          </p>
          <Link href="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
