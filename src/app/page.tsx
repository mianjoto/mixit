import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Pretitle } from "@/components/base/Pretitle";

export default function Index() {
  return (
    <>
      <Heading level="h1" textColor="primary">
        Heading one
      </Heading>
      <Heading level="h2">Heading two</Heading>

      <Heading level="h3" textColor="accent">
        Heading three
      </Heading>
      <Heading level="h4" textColor="gray">
        Heading four
      </Heading>
      <Heading level="h5">Heading five</Heading>
      <Text level="p">
        Paragraph paragraph paragraph, paragraph paragraph. Paragraph paragraph
        paragraph, paragraph paragraph. Paragraph paragraph paragraph, paragraph
        paragraph. Paragraph paragraph paragraph, paragraph paragraph.
      </Text>
      <Text level="small">Text small.</Text>
      <Pretitle>PRETITLE</Pretitle>

      <div className="w-fit grid-cols-3">
        <div>
          <Button size="cta">Call to action</Button>
          <Button size="cta" variant="outline">
            Call to action
          </Button>
          <Button size="cta" disabled>
            Call to action
          </Button>
        </div>
        <div>
          <Button>Medium Button</Button>
          <Button variant="outline">Medium Button</Button>
          <Button disabled>Medium Button</Button>
        </div>
      </div>

      <Card>
        <h3 className="uppercase">Subtitle</h3>
        <span className="subtitle">
          Never repeat songs with a truly shuffled queue
        </span>
      </Card>
    </>
  );
}
