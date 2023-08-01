import { Button } from "./components/Button";

export default function App() {
  return (
    <div className="container mx-auto  py-32">
      <h1 className="text-primary">Heading one</h1>

      <h2>Heading two</h2>
      <h3>Heading three</h3>
      <p className="text-body">
        Paragraph paragraph paragraph, paragraph paragraph.
      </p>

      <p className="subtitle">Subtitle subtitle subtitle.</p>
      <p className="link">Link link</p>
      <small>Small small.</small>
      <span className="pretitle">PRETITLE</span>

      <div className="grid grid-flow-col">
        <div>
          <Button size="lg">Large Button</Button>
          <Button size="lg" variant="outline">
            Large Button
          </Button>
          <Button size="lg" disabled>
            Large Button
          </Button>
        </div>
        <div>
          <Button>Medium Button</Button>
          <Button variant="outline">Medium Button</Button>
          <Button disabled>Medium Button</Button>
        </div>
        <div>
          <Button size="sm">Small Button</Button>
          <Button size="sm" variant="outline">
            Small Button
          </Button>
          <Button size="sm" disabled>
            Small Button
          </Button>
        </div>
      </div>
    </div>
  );
}
