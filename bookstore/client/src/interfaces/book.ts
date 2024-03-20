export interface BookData {
  title: string;
  description: string;
  author: string;
  publicationDate: string;
  genre: string;
  price: number;
  _id?: string;
}
export interface BookCardProps {
  book: BookData;
  onDelete: any;
}
export interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export interface BookDetailsProps {
  open: boolean;
  onClose: () => void;
  book: BookData;
}
