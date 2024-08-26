import type { LastFmTrackProps, TrackProps } from "@/infra/api/lastfm/types";
import Image from "next/image";
import type { FC } from "react";
import { PiMusicNote, PiStop } from "react-icons/pi";
import { RiPauseMiniFill } from "react-icons/ri";
import styles from "./styles.module.css";

export const LastFMTrack: FC<LastFmTrackProps> = ({ lastFm }) => {
	const track: TrackProps = lastFm?.recenttracks?.track[0];

	if (!track) return <span />;

	const isPlaying = track["@attr"]?.nowplaying === "true";
	const imageUrl = track.image[3]["#text"];

	return (
		<div className={styles.playing}>
			{imageUrl ? (
				<Image
					fetchPriority="high"
					rel="preload"
					quality={60}
					alt={track.name}
					src={imageUrl}
					width={90}
					height={90}
				/>
			) : (
				<span />
			)}
			<section className={styles.playingArtist}>
				<section className={styles.playingSpot}>
					<PiMusicNote size={19} color="var(--main-color)" />
					<span className={styles.artist}>{track.artist["#text"]}</span>
				</section>

				<p className={styles.play}>
					<a href={track.url} target="_blank" rel="noreferrer">
						{isPlaying ? <RiPauseMiniFill size={19} /> : <PiStop size={19} />}
						<strong className={styles.song}>{track.name}</strong>
					</a>
				</p>
			</section>
		</div>
	);
};
