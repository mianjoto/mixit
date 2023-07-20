import Button from "./components/Button";

export default function App() {
  return (
    <div className="container mx-auto py-32">
      <h1>Heading one</h1>
      <h2>Heading two</h2>
      <h3>Heading three</h3>
      <p>Paragraph paragraph paragraph, paragraph paragraph.</p>
      <div>
        <Button>Large Button</Button>
        <Button variant="secondary">Large Button</Button>
        <Button disabled>Large Button</Button>
      </div>
      <div>
        <Button size="md">Medium Button</Button>
        <Button size="md" variant="secondary">
          Medium Button
        </Button>
        <Button size="md" disabled>
          Medium Button
        </Button>
      </div>

      <div>
        <Button size="sm">Small Button</Button>
        <Button size="sm" variant="secondary">
          Small Button
        </Button>
        <Button size="sm" disabled>
          Small Button
        </Button>
      </div>
    </div>
  );
}
