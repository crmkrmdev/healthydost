const images = import.meta.glob("../assets/images/yoga/*.png", { eager: true });

const ImportYogaImage = {};

for (const path in images) {
  const name = path.split("/").pop().replace(".png", "");
  ImportYogaImage[name] = images[path].default;
}

export default ImportYogaImage;
