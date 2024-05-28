#! /usr/bin/env node
require("dotenv").config();

// get arguments
const userArgs = process.argv.slice(2);

// import models
const Genre = require("./models/genre");
const Artist = require("./models/artist");
const Album = require("./models/album");
const Song = require("./models/song");
const CD = require("./models/cd");

const genres = [];
const artists = [];
const albums = [];
const songs = [];
const cds = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dev_db_url = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PW}@cluster0.x1ddt44.mongodb.net/music_store?retryWrites=true&w=majority&appName=Cluster0`;
const mongoDB = dev_db_url;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createArtists();
  await createAlbums();
  await createSongs();
  await createCDs();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// DB instance creation
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function artistCreate(index, name, description, debut) {
  const artist = new Artist({
    name: name,
    description: description,
    debut: debut,
  });
  await artist.save();
  artists[index] = artist;
  console.log(`Added artist: ${artist.name}`);
}

async function albumCreate(index, name, description, release, artist, genre) {
  const album = new Album({
    name: name,
    description: description,
    release: release,
    artist: artist,
    genre: genre,
  });
  await album.save();
  albums[index] = album;
  console.log(`Added album: ${name}`);
}

async function songCreate(index, name, duration, album) {
  const song = new Song({
    name: name,
    duration: duration,
    album: album,
  });
  await song.save();
  songs[index] = song;
  console.log(`Added song: ${name}`);
}

async function cdCreate(index, album, price, stock) {
  const cd = new CD({
    album: album,
    price: price,
    stock: stock,
  });
  await cd.save();
  cds[index] = cd;
  console.log(`Added cs: ${(album.name, price, stock)}`);
}

// create instances
async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Rock"),
    genreCreate(1, "Pop"),
    genreCreate(2, "Hiphop"),
    genreCreate(3, "Country"),
    genreCreate(4, "R&B"),
  ]);
}

async function createArtists() {
  console.log("Adding artists");
  await Promise.all([
    artistCreate(0, "Queen", "Your favorite British geezers", "1970-08-21"),
    artistCreate(
      1,
      "Beatles",
      "The Beatles were an English rock band formed in Liverpool in 1960, comprising John Lennon, Paul McCartney, George Harrison and Ringo Starr.",
      "1960-04-20"
    ),
    artistCreate(
      2,
      "Kendrick Lamar",
      "Currently in jail for cooking Drake",
      "2011-07-02"
    ),
    artistCreate(
      3,
      "Oasis",
      'An English rock band formed in Manchester in 1991, known for hits like "Wonderwall" and "Don\'t Look Back in Anger."',
      "1991-10-05"
    ),
    artistCreate(
      4,
      "The Eagles",
      'An American rock band formed in Los Angeles in 1971, known for classic songs like "Hotel California" and "Take It Easy."',
      "1971-09-22"
    ),
    artistCreate(
      5,
      "Usher",
      'An American singer, songwriter, and dancer who rose to fame in the late 1990s with hits like "You Make Me Wanna..." and "Nice & Slow."',
      "1994-08-30"
    ),
    artistCreate(
      6,
      "Bruno Mars",
      'An American singer, songwriter, and record producer known for his versatile musical style and hits like "Just the Way You Are" and "Uptown Funk."',
      "2010-07-20"
    ),
  ]);
}

async function createAlbums() {
  console.log("Adding albums");
  await Promise.all([
    // Albums for Queen (Rock)
    albumCreate(
      0,
      "A Night at the Opera",
      "The fourth studio album by Queen, released in 1975.",
      "1975-11-21",
      artists[0],
      genres[0]
    ),
    albumCreate(
      1,
      "News of the World",
      "The sixth studio album by Queen, released in 1977.",
      "1977-10-28",
      artists[0],
      genres[0]
    ),
    albumCreate(
      2,
      "The Game",
      "The eighth studio album by Queen, released in 1980.",
      "1980-06-30",
      artists[0],
      genres[0]
    ),

    // Albums for The Beatles (Rock)
    albumCreate(
      3,
      "Sgt. Pepper's Lonely Hearts Club Band",
      "The eighth studio album by The Beatles, released in 1967.",
      "1967-05-26",
      artists[1],
      genres[0]
    ),
    albumCreate(
      4,
      "Abbey Road",
      "The eleventh studio album by The Beatles, released in 1969.",
      "1969-09-26",
      artists[1],
      genres[0]
    ),
    albumCreate(
      5,
      "Let It Be",
      "The twelfth and final studio album by The Beatles, released in 1970.",
      "1970-05-08",
      artists[1],
      genres[0]
    ),

    // Albums for Kendrick Lamar (Hiphop)
    albumCreate(
      6,
      "good kid, m.A.A.d city",
      "The second studio album by Kendrick Lamar, released in 2012.",
      "2012-10-22",
      artists[2],
      genres[2]
    ),
    albumCreate(
      7,
      "To Pimp a Butterfly",
      "The third studio album by Kendrick Lamar, released in 2015.",
      "2015-03-15",
      artists[2],
      genres[2]
    ),
    albumCreate(
      8,
      "DAMN.",
      "The fourth studio album by Kendrick Lamar, released in 2017.",
      "2017-04-14",
      artists[2],
      genres[2]
    ),

    // Albums for Oasis (Rock)
    albumCreate(
      9,
      "(What's the Story) Morning Glory?",
      "The second studio album by Oasis, released in 1995.",
      "1995-10-02",
      artists[3],
      genres[0]
    ),
    albumCreate(
      10,
      "Definitely Maybe",
      "The debut studio album by Oasis, released in 1994.",
      "1994-08-29",
      artists[3],
      genres[0]
    ),
    albumCreate(
      11,
      "Be Here Now",
      "The third studio album by Oasis, released in 1997.",
      "1997-08-21",
      artists[3],
      genres[0]
    ),

    // Albums for The Eagles (Rock)
    albumCreate(
      12,
      "Hotel California",
      "The fifth studio album by The Eagles, released in 1976.",
      "1976-12-08",
      artists[4],
      genres[0]
    ),
    albumCreate(
      13,
      "Desperado",
      "The second studio album by The Eagles, released in 1973.",
      "1973-04-17",
      artists[4],
      genres[0]
    ),
    albumCreate(
      14,
      "One of These Nights",
      "The fourth studio album by The Eagles, released in 1975.",
      "1975-06-10",
      artists[4],
      genres[0]
    ),

    // Albums for Usher (R&B)
    albumCreate(
      15,
      "My Way",
      "The second studio album by Usher, released in 1997.",
      "1997-09-16",
      artists[5],
      genres[4]
    ),
    albumCreate(
      16,
      "8701",
      "The third studio album by Usher, released in 2001.",
      "2001-08-07",
      artists[5],
      genres[4]
    ),
    albumCreate(
      17,
      "Confessions",
      "The fourth studio album by Usher, released in 2004.",
      "2004-03-23",
      artists[5],
      genres[4]
    ),

    // Albums for Bruno Mars (Pop)
    albumCreate(
      18,
      "Doo-Wops & Hooligans",
      "The debut studio album by Bruno Mars, released in 2010.",
      "2010-10-05",
      artists[6],
      genres[1]
    ),
    albumCreate(
      19,
      "Unorthodox Jukebox",
      "The second studio album by Bruno Mars, released in 2012.",
      "2012-12-07",
      artists[6],
      genres[1]
    ),
    albumCreate(
      20,
      "24K Magic",
      "The third studio album by Bruno Mars, released in 2016.",
      "2016-11-18",
      artists[6],
      genres[1]
    ),
  ]);
}

async function createSongs() {
  console.log("Adding songs");
  await Promise.all([
    // Songs for "A Night at the Opera" by Queen
    songCreate(0, "Bohemian Rhapsody", "5:55", albums[0]),
    songCreate(1, "Love of My Life", "3:38", albums[0]),
    songCreate(2, "You're My Best Friend", "2:50", albums[0]),
    songCreate(3, "I'm In Love With My Car", "3:05", albums[0]),
    songCreate(4, "The Prophet's Song", "8:21", albums[0]),

    // Songs for "News of the World" by Queen
    songCreate(5, "We Will Rock You", "2:02", albums[1]),
    songCreate(6, "We Are the Champions", "2:59", albums[1]),
    songCreate(7, "Sheer Heart Attack", "3:27", albums[1]),
    songCreate(8, "All Dead, All Dead", "3:10", albums[1]),
    songCreate(9, "Spread Your Wings", "4:32", albums[1]),

    // Songs for "The Game" by Queen
    songCreate(10, "Another One Bites the Dust", "3:35", albums[2]),
    songCreate(11, "Crazy Little Thing Called Love", "2:42", albums[2]),
    songCreate(12, "Save Me", "3:48", albums[2]),
    songCreate(13, "Play the Game", "3:30", albums[2]),
    songCreate(14, "Dragon Attack", "4:18", albums[2]),

    // Songs for "Sgt. Pepper's Lonely Hearts Club Band" by The Beatles
    songCreate(15, "Sgt. Pepper's Lonely Hearts Club Band", "2:02", albums[3]),
    songCreate(16, "With a Little Help from My Friends", "2:44", albums[3]),
    songCreate(17, "Lucy in the Sky with Diamonds", "3:28", albums[3]),
    songCreate(18, "Getting Better", "2:47", albums[3]),
    songCreate(19, "Fixing a Hole", "2:36", albums[3]),

    // Songs for "Abbey Road" by The Beatles
    songCreate(20, "Come Together", "4:20", albums[4]),
    songCreate(21, "Something", "3:03", albums[4]),
    songCreate(22, "Maxwell's Silver Hammer", "3:27", albums[4]),
    songCreate(23, "Oh! Darling", "3:26", albums[4]),
    songCreate(24, "Octopus's Garden", "2:51", albums[4]),

    // Songs for "Let It Be" by The Beatles
    songCreate(25, "Two of Us", "3:36", albums[5]),
    songCreate(26, "Dig a Pony", "3:55", albums[5]),
    songCreate(27, "Across the Universe", "3:48", albums[5]),
    songCreate(28, "I Me Mine", "2:25", albums[5]),
    songCreate(29, "Let It Be", "4:03", albums[5]),

    // Songs for "good kid, m.A.A.d city" by Kendrick Lamar
    songCreate(
      30,
      "Sherane a.k.a Master Splinter's Daughter",
      "4:33",
      albums[6]
    ),
    songCreate(31, "Bitch, Don't Kill My Vibe", "5:10", albums[6]),
    songCreate(32, "Backseat Freestyle", "3:32", albums[6]),
    songCreate(33, "The Art of Peer Pressure", "5:24", albums[6]),
    songCreate(34, "Money Trees", "6:26", albums[6]),

    // Songs for "To Pimp a Butterfly" by Kendrick Lamar
    songCreate(35, "Wesley's Theory", "4:47", albums[7]),
    songCreate(36, "For Free? (Interlude)", "2:10", albums[7]),
    songCreate(37, "King Kunta", "3:54", albums[7]),
    songCreate(38, "Institutionalized", "4:31", albums[7]),
    songCreate(39, "These Walls", "5:00", albums[7]),

    // Songs for "DAMN." by Kendrick Lamar
    songCreate(40, "BLOOD.", "1:58", albums[8]),
    songCreate(41, "DNA.", "3:05", albums[8]),
    songCreate(42, "YAH.", "2:40", albums[8]),
    songCreate(43, "ELEMENT.", "3:28", albums[8]),
    songCreate(44, "FEEL.", "3:34", albums[8]),

    // Songs for "(What\'s the Story) Morning Glory?" by Oasis
    songCreate(45, "Hello", "3:21", albums[9]),
    songCreate(46, "Roll with It", "3:59", albums[9]),
    songCreate(47, "Wonderwall", "4:18", albums[9]),
    songCreate(48, "Don't Look Back in Anger", "4:48", albums[9]),
    songCreate(49, "Hey Now!", "5:41", albums[9]),

    // Songs for "Definitely Maybe" by Oasis
    songCreate(50, "Rock 'n' Roll Star", "5:22", albums[10]),
    songCreate(51, "Shakermaker", "5:08", albums[10]),
    songCreate(52, "Live Forever", "4:36", albums[10]),
    songCreate(53, "Up in the Sky", "4:28", albums[10]),
    songCreate(54, "Columbia", "6:17", albums[10]),

    // Songs for "Be Here Now" by Oasis
    songCreate(55, "D'You Know What I Mean?", "7:42", albums[11]),
    songCreate(56, "My Big Mouth", "5:02", albums[11]),
    songCreate(57, "Magic Pie", "7:19", albums[11]),
    songCreate(58, "Stand by Me", "5:56", albums[11]),
    songCreate(59, "I Hope, I Think, I Know", "4:23", albums[11]),

    // Songs for "Hotel California" by The Eagles
    songCreate(60, "Hotel California", "6:30", albums[12]),
    songCreate(61, "New Kid in Town", "5:04", albums[12]),
    songCreate(62, "Life in the Fast Lane", "4:46", albums[12]),
    songCreate(63, "Wasted Time", "4:55", albums[12]),
    songCreate(64, "Victim of Love", "4:10", albums[12]),

    // Songs for "Desperado" by The Eagles
    songCreate(65, "Doolin-Dalton", "3:26", albums[13]),
    songCreate(66, "Twenty-One", "2:10", albums[13]),
    songCreate(67, "Out of Control", "3:05", albums[13]),
    songCreate(68, "Tequila Sunrise", "2:52", albums[13]),
    songCreate(69, "Desperado", "3:34", albums[13]),

    // Songs for "One of These Nights" by The Eagles
    songCreate(70, "One of These Nights", "4:51", albums[14]),
    songCreate(71, "Too Many Hands", "4:43", albums[14]),
    songCreate(72, "Hollywood Waltz", "4:01", albums[14]),
    songCreate(73, "Journey of the Sorcerer", "6:39", albums[14]),
    songCreate(74, "Lyin' Eyes", "6:21", albums[14]),

    // Songs for "My Way" by Usher
    songCreate(75, "You Make Me Wanna...", "3:40", albums[15]),
    songCreate(76, "Just Like Me", "3:25", albums[15]),
    songCreate(77, "Nice & Slow", "3:48", albums[15]),
    songCreate(78, "My Way", "3:35", albums[15]),
    songCreate(79, "Come Back", "3:39", albums[15]),

    // Songs for "8701" by Usher
    songCreate(80, "U Remind Me", "4:27", albums[16]),
    songCreate(81, "I Don't Know", "4:28", albums[16]),
    songCreate(82, "Twork It Out", "4:45", albums[16]),
    songCreate(83, "U Got It Bad", "4:07", albums[16]),
    songCreate(84, "If I Want To", "3:54", albums[16]),

    // Songs for "Confessions" by Usher
    songCreate(85, "Yeah!", "4:10", albums[17]),
    songCreate(86, "Throwback", "4:09", albums[17]),
    songCreate(87, "Confessions Part II", "3:49", albums[17]),
    songCreate(88, "Burn", "4:15", albums[17]),
    songCreate(89, "Caught Up", "3:45", albums[17]),

    // Songs for "Doo-Wops & Hooligans" by Bruno Mars
    songCreate(90, "Just the Way You Are", "3:40", albums[18]),
    songCreate(91, "Grenade", "3:42", albums[18]),
    songCreate(92, "The Lazy Song", "3:15", albums[18]),
    songCreate(93, "Marry You", "3:50", albums[18]),
    songCreate(94, "Talking to the Moon", "3:37", albums[18]),

    // Songs for "Unorthodox Jukebox" by Bruno Mars
    songCreate(95, "Locked Out of Heaven", "3:53", albums[19]),
    songCreate(96, "Treasure", "2:58", albums[19]),
    songCreate(97, "Gorilla", "4:04", albums[19]),
    songCreate(98, "When I Was Your Man", "3:34", albums[19]),
    songCreate(99, "Natalie", "3:45", albums[19]),

    // Songs for "24K Magic" by Bruno Mars
    songCreate(100, "24K Magic", "3:46", albums[20]),
    songCreate(101, "Chunky", "3:07", albums[20]),
    songCreate(102, "Perm", "3:30", albums[20]),
    songCreate(103, "That’s What I Like", "3:26", albums[20]),
    songCreate(104, "Versace on the Floor", "4:21", albums[20]),
  ]);
}

async function createCDs() {
  console.log("Adding CD's");
  await Promise.all([
    cdCreate(0, albums[0], 9.99, 12),
    cdCreate(1, albums[1], 9.99, 23),
    cdCreate(2, albums[2], 9.99, 1),
    cdCreate(3, albums[3], 9.99, 2),
    cdCreate(4, albums[4], 10.99, 0),
    cdCreate(5, albums[5], 3.99, 3),
    cdCreate(6, albums[6], 20.99, 12),
    cdCreate(7, albums[7], 9.99, 19),
    cdCreate(8, albums[8], 9.99, 11),
    cdCreate(9, albums[9], 9.99, 1),
    cdCreate(10, albums[10], 9.99, 12),
    cdCreate(11, albums[11], 7.99, 12),
    cdCreate(12, albums[12], 9.99, 8),
    cdCreate(13, albums[13], 9.99, 12),
    cdCreate(14, albums[14], 9.99, 12),
    cdCreate(15, albums[15], 4.99, 132),
    cdCreate(16, albums[16], 9.99, 1),
    cdCreate(17, albums[17], 9.99, 2),
    cdCreate(18, albums[18], 9.99, 32),
    cdCreate(19, albums[19], 9.99, 7),
    cdCreate(20, albums[20], 9.99, 9),
  ]);
}
