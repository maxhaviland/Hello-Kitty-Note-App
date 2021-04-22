export class Note {
  public id?: number;
  public text: string;
  public image: string;
  public color: string;

  constructor({ id, text, image, color }: { id?: number; text: string; image: string; color: string }) {
    this.id = id;
    this.text = text;
    this.image = image;
    this.color = color;
  }

  setText = (text: string) => this.text = text;
  getText = (): string => this.text;

  setImage = (image: string) => this.image = image;
  getImage = (): string => this.image;

  setColor = (color: string) => this.color = color;
  getColor = (): string => this.color;

  isValid = (): boolean => Boolean(this.getText().trim());
};

