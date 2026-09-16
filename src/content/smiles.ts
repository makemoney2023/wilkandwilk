export type SmilePhoto = {
  file: string;
  alt: string;
};

export const smilePhotos: SmilePhoto[] = [
  { file: "3.jpg", alt: "A Wilk and Wilk smile" },
  { file: "5.jpg", alt: "A Wilk and Wilk smile" },
  { file: "Aaron.jpg", alt: "Aaron’s smile" },
  { file: "Brandon.jpg", alt: "Brandon’s smile" },
  { file: "Cassie.jpg", alt: "Cassie’s smile" },
  { file: "dana.jpg", alt: "Dana’s smile" },
  { file: "Heather.jpg", alt: "Heather’s smile" },
  { file: "Jordana.jpg", alt: "Jordana’s smile" },
  { file: "Katelyn.jpg", alt: "Katelyn’s smile" },
  { file: "Luke.jpg", alt: "Luke’s smile" },
  { file: "Mel.jpg", alt: "Mel’s smile" },
  { file: "Michelle.jpg", alt: "Michelle’s smile" },
  { file: "Olivia.jpg", alt: "Olivia’s smile" },
  { file: "smile071.jpg", alt: "A Wilk and Wilk smile" },
  { file: "smile-gallery08.jpg", alt: "A Wilk and Wilk smile" },
  { file: "smile-gallery10.jpg", alt: "A Wilk and Wilk smile" },
  { file: "2x3.jpg", alt: "A Wilk and Wilk smile" },
  { file: "Alida_F.jpg", alt: "Alida’s smile" },
  { file: "April_F.jpg", alt: "April’s smile" },
  { file: "Claudia_V.jpg", alt: "Claudia’s smile" },
  { file: "Desiree_G.jpg", alt: "Desiree’s smile" },
  { file: "DSC_2741.jpg", alt: "A Wilk and Wilk smile" },
  { file: "DSC_3301.jpg", alt: "A Wilk and Wilk smile" },
  { file: "DSC_3558.jpg", alt: "A Wilk and Wilk smile" },
  { file: "DSC_3817.jpg", alt: "A Wilk and Wilk smile" },
  { file: "DSC_3862.jpg", alt: "A Wilk and Wilk smile" },
  { file: "smile-gallery11.jpg", alt: "A Wilk and Wilk smile" },
  { file: "smile-gallery12.jpg", alt: "A Wilk and Wilk smile" },
  { file: "2.jpg", alt: "A Wilk and Wilk smile" },
  { file: "smile-gallery13.jpg", alt: "A Wilk and Wilk smile" },
  { file: "4.jpg", alt: "A Wilk and Wilk smile" },
  { file: "1.jpg", alt: "A Wilk and Wilk smile" },
];

export function getSmileGalleryPhotos() {
  return smilePhotos.map((photo) => ({
    src: `/media/smiles/${photo.file}`,
    alt: photo.alt,
  }));
}

export function getSmileGalleryFiles() {
  return smilePhotos.map((photo) => photo.file);
}
