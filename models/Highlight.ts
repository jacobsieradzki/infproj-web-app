import PdfDocumentHelper from 'helper/pdfDocument'
import { IHighlight, NewHighlight, Scaled, ScaledPosition } from 'lib/react-pdf-highlighter'

export class Highlight {

  public id: number;
  public bounding_rect: HighlightRect;
  public rects: HighlightRect[];
  private created_at?: string;
  private updated_at?: string;

  constructor(json: any) {
    if (!json) return null;
    this.id = json.id;
    this.bounding_rect = new HighlightRect(json.bounding_rect);
    this.rects = json.rects?.map(x => new HighlightRect(x));
    this.created_at = json.created_at;
    this.updated_at = json.updated_at;
  }

  static fromHighlight(highlight: NewHighlight): Highlight {
    return {
      id: parseInt(PdfDocumentHelper.getRandomId()),
      bounding_rect: new HighlightRect({
        ...HighlightRect.fromHighlight(highlight.position.boundingRect),
        page_number: highlight.position.pageNumber
      }),
      rects: highlight.position.rects.map(x => HighlightRect.fromHighlight(x))
    }
  }

}

export class HighlightRect {

  public x1: number;
  public x2: number;
  public y1: number;
  public y2: number;
  public width: number;
  public height: number;
  public page_number: number;

  public toLibraryModel(): Scaled {
    return {
      x1: this.x1,
      x2: this.x2,
      y1: this.y1,
      y2: this.y2,
      width: this.width,
      height: this.height,
    }
  }

  constructor(json: any) {
    if (!json) return null;
    this.x1 = json.x1;
    this.x2 = json.x2;
    this.y1 = json.y1;
    this.y2 = json.y2;
    this.width = json.width;
    this.height = json.height;
    this.page_number = json.page_number;
  }

  static fromHighlight(highlight: Scaled): HighlightRect {
    return new HighlightRect({
      x1: highlight.x1,
      x2: highlight.x2,
      y1: highlight.y1,
      y2: highlight.y2,
      width: highlight.width,
      height: highlight.height,
      page_number: highlight.pageNumber
    })
  }

}

export default Highlight