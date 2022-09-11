import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Featured.module.css';

const Featured = () => {
	let [index, setIndex] = useState<number>(0);
	let timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const images: string[] = [
		'/img/featured2.png',
		'/img/featured3.png',
		'/img/featured2.png'
	];
	let delay = 3000;

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}
	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(() => {
			setIndex((prevIndex) =>
				prevIndex >= 2 ? (prevIndex = 0) : prevIndex + 1
			);
		}, delay);
	}, [index, delay]);

	function handleClickArrow(direction: string) {
		resetTimeout();
		if (direction === 'left') {
			setIndex(index !== 0 ? index - 1 : 2);
		}
		if (direction === 'right') {
			setIndex(index !== 2 ? index + 1 : 0);
		}
	}

	return (
		<div className={styles.container}>
			<div
				className={styles['arrow-container']}
				style={{ left: 0 }}
				onClick={() => handleClickArrow('left')}
			>
				<Image
					src={'/img/arrowl.png'}
					alt={'carousel-left'}
					layout='fill'
					objectFit='contain'
				></Image>
			</div>
			<div
				className={styles['carousel-wrapper']}
				style={{ transform: `translateX(${-100 * index}vw)` }}
			>
				{images.map((img, idx) => (
					<div
						key={idx}
						className={styles['img-container']}
					>
						<Image
							src={img}
							alt={'featured'}
							layout='fill'
							objectFit='contain'
						/>
					</div>
				))}
			</div>
			<div
				className={styles['arrow-container']}
				style={{ right: 0 }}
				onClick={() => handleClickArrow('right')}
			>
				<Image
					src={'/img/arrowr.png'}
					alt={'carousel-right'}
					layout='fill'
					objectFit='contain'
				></Image>
			</div>
		</div>
	);
};

export default Featured;
