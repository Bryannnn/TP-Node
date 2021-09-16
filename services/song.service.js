const SongRepository = require("../repositories/song.repository");

/**
 * Song service
 */

const SongService = {
  findAll: async () => {
    return await SongRepository.findAll();
  },
  findById: async (id) => {
    const song = await SongRepository.findById(id);
    return song;
  },
  findByName: async (auteur) => {
    const song = await SongRepository.findByName(auteur);
    return song;
  },
  create: async (song) => {
    await SongRepository.create(song);
  },
  update: async (id, songInfo) => {
    const song = await SongRepository.findById(id);
    if (!song) {
      throw Error("song not found");
    }
    await SongRepository.update(id, songInfo);
  },
  delete: async (id) => {
    const song = await SongRepository.findById(id);
    if (!song) {
      throw Error("song not found");
    }
    return await SongRepository.delete(id);
  },
};

module.exports = SongService;
