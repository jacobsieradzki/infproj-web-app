import { IHighlight, NewHighlight } from 'lib/react-pdf-highlighter'
import Highlight from 'models/Highlight'
import Resource from 'models/Resource'
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api'

export class Clip {

  public id: string;
  public course_id: string;
  public resource?: Resource;
  public content: string;
  public description: string;
  public emoji: string;
  public type: "VIDEO_CLIP" | "PDF_CLIP" | "PDF_PAGE" | "";
  public start_location: number;
  public end_location: number;
  public highlight?: Highlight;
  private readonly created_at: string;
  private readonly updated_at: string;

  public toLibraryModel(): IHighlight {
    return {
      id: this.highlight.id.toString(),
      comment: {
        text: this.description,
        emoji: this.emoji,
      },
      content: {
        text: !this.isImage() ? this.content : null,
        image: this.isImage() ? this.content : null
      },
      position: {
        boundingRect: this.highlight.bounding_rect.toLibraryModel(),
        pageNumber: this.highlight.bounding_rect.page_number,
        rects: this.highlight.rects?.map(x => x.toLibraryModel()) || []
      }
    }
  }

  constructor(json: any) {
    if (!json) return null;
    this.id = json.id;
    this.course_id = json.course_id;
    this.resource = json.resource;
    this.content = json.content;
    this.description = json.description;
    this.emoji = json.emoji;
    this.type = json.type;
    this.start_location = json.start_location;
    this.end_location = json.end_location;
    this.highlight = new Highlight(json.highlight);
    this.created_at = json.created_at;
    this.updated_at = json.updated_at;
  }

  public isImage() {
    return this.content?.startsWith("data:image");
  }

  static async forPagesOfPdf(pdfDocument: PDFDocumentProxy): Promise<Clip[]> {
    let clips = [];
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      let page = await pdfDocument.getPage(i);
      let [x, y, w, h] = page._pageInfo.view;

      let clip = new Clip({
        course_id: 0,
        description: "Page " + i.toString(),
        type: "PDF_PAGE",
        start_location: i,
        end_location: 0,
        highlight: {
          id: i,
          bounding_rect: {
            x1: 0, x2: w, y1: 0, y2: 1,
            width: w, height: 100,
            page_number: i,
          },
          rects: []
        }
      });
      clips.push(clip);
    }

    return new Promise<Clip[]>(function(resolve, reject) {
      resolve(clips);
    })
  }

  static fromHighlight(highlight: NewHighlight): Clip {
    return new Clip({
      content: highlight.content.image || highlight.content.text,
      description: highlight.comment.text,
      emoji: highlight.comment.emoji,
      type: "PDF_CLIP",
      highlight: Highlight.fromHighlight(highlight),
    });
  }

}

export default Clip;