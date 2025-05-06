const yogaImages = import.meta.glob("../assets/images/yoga/*.png", {
  eager: true,
});
const ImportYogaImage = {};
for (const path in yogaImages) {
  const name = path.split("/").pop().replace(".png", "");
  ImportYogaImage[name] = yogaImages[path].default;
}

const herbsImages = import.meta.glob("../assets/images/herbs/*.png", {
  eager: true,
});
const ImportHerbsImage = {};
for (const path in herbsImages) {
  const name = path.split("/").pop().replace(".png", "");
  ImportHerbsImage[name] = herbsImages[path].default;
}

const homeRemediesImages = import.meta.glob(
  "../assets/images/homeRemedies/*.png",
  {
    eager: true,
  }
);
const ImportHomeRemediesImage = {};
for (const path in homeRemediesImages) {
  const name = path.split("/").pop().replace(".png", "");
  ImportHerbsImage[name] = homeRemediesImages[path].default;
}

export { ImportYogaImage, ImportHerbsImage, ImportHomeRemediesImage };
