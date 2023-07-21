import Button from "./components/Button";
import Card from "./components/Card";
import CardWithSymbolIcon from "./components/CardWithSymbolIcon";
import SvgIcon from "./components/SvgIcon";

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

      <Card size="md" bgColorClass={"accent-1"}>
        <SvgIcon
          path={
            <path
              d="M149.554 214.657V193.218H178.315L134.39 149.554L149.554 134.128L193.741 178.053V149.031H215.442V214.657H149.554ZM50.7229 215.965L35.8198 200.539L178.838 57.5208H149.554V36.0812H215.442V101.707H193.741V72.9468L50.7229 215.965ZM101.969 115.826L35.8198 50.2L50.9844 34.7739L117.395 100.661L101.969 115.826Z"
              fill="black"
            />
          }
        ></SvgIcon>
      </Card>

      <Card size="md" bgColorClass="accent-1">
        d
      </Card>

      <CardWithSymbolIcon
        size={"auto"}
        bgColorClass={"accent-1"}
        symbolName={"shuffle"}
      ></CardWithSymbolIcon>
    </div>
  );
}
