import "../toProperCase";
import { prisma } from "./client";

export let getLocation = async (name) => {
  return await prisma.location.findFirst({
    where: { name: name.toProperCase() },
  });
};
