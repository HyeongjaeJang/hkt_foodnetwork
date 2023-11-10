const { upload } = require("../middleware");
const prisma = require("../prisma/index");

exports.uploadEvent = async (req, res) => {
  const data = req.body;
  const tk = req.headers["authorization"];
  const {
    organizationId,
    title,
    description,
    keyword,
    eventDate,
    location,
    foods,
  } = req.body;
  const img = req.files;

  const { id: eventId } = await prisma.event.create({
    data: {
      title: title,
      description: description,
      keyword: JSON.parse(keyword),
      eventDate: new Date(Date.now()),
      location: location,
      foods: JSON.parse(foods),
      organizationId: organizationId,
    },
  });
  img.forEach(async (el) => {
    const imgOne = await prisma.image.create({
      data: {
        fieldname: el.fieldname,
        originalname: el.originalname,
        encoding: el.encoding,
        mimetype: el.mimetype,
        destination: el.destination,
        filename: el.filename,
        path: el.path,
        size: el.size,
        eventId: eventId,
      },
    });
  });
  return res.sendStatus(200);

  // cloudinary.uploader.upload(
  //   req.file.path,
  //   { resource_type: "auto" },
  //   (error, result) => {
  //     if (result && result.secure_url) {
  //       return res
  //         .status(200)
  //         .json({ message: "Image uploaded", imageUrl: result.secure_url });
  //     } else {
  //       return res.status(500).json({ error: "Image upload failed" });
  //     }
  //   }
  // );
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id, organization } = req.body;
    const event = await prisma.event.findFirst({
      where: { id: id },
    });

    if (!event) {
      return res.status(400).json({ error: "Event not found" });
    }

    if (event.organizationId === organization) {
      await prisma.event.delete({ where: { id: id } });
      return res.status(200).json({ message: "Event deleted" });
    } else {
      return res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const {
      id,
      keyword,
      eventDate,
      title,
      description,
      organization,
      location,
    } = req.body;

    const existEvent = await prisma.event.findFirst({
      where: { id: id },
    });

    if (existEvent.organizationId !== organization) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        keyword,
        eventDate,
        title,
        description,
        organization,
        location,
      },
    });

    return res.status(200).json({ message: "Event update" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};
