const expect = require("chai").expect;
const SongService = require("../services/song.service");

//#test data

const song1 = {
    genre: "Bien",
    titre: "Du bon son",
    duree: "60",
    auteur: "Moi"
}
const song2 = {
    genre: "Cool",
    titre: "99 Luftballons",
    duree: "120",
    auteur: "Nena"
}

//#end test data

describe("SongService", () => {
    describe("findAll", () => {
        it("should return OK", () => {
            const result = SongService.findAll();
            expect(result).exist;
        });
    });
    describe("create", () => {
        it("should return song", () => {
            const result = SongService.create(song1);
            expect(result).exist;
        });
    });
    describe("update", () => {
        it("should return OK", () => {
            const result = SongService.update(1, song2.titre);//ID d'un des songs dans la base
            expect(result).exist;
        });
        it("should return 404", () => {
            const result = SongService.update(2, song1.titre);//ID d'un song qui n'existe pas
            expect(result).exist;
        })
    });
    describe("delete", () => {
        it("should return null", () => {
            const result = SongService.delete(1);//ID d'un des songs dans la base
            expect(result).exist;
        });
    });
});