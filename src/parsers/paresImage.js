export default function parseImage(image, placeholder = null) {
   return image ? `${process.env.API_ROOT}media/${image}` : placeholder;
}
