export default function getBreadcrumbs(pathname = '') {
   const paths = [];

   pathname.split('/').reduce((prev, curr) => {
      const url = `${prev}/${curr}`;

      paths.push({
         name: curr,
         url,
      });

      return url;
   });

   return { breadcrumbs: paths };
}
