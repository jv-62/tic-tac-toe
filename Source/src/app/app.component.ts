import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'tic-tac-toe';

	winMessage: string = '';
	isGameDraw: boolean = false;
	isCross = false;
	itemArray: string[] = new Array(9).fill('empty');
	showPoppers: boolean = false;
	poppers: Array<{ id: number; emoji: string }> = [];

	constructor(private toastr: ToastrService) {}

	playClickSound() {
		this.playSound(400, 0.1, 100);
	}

	playWinSound() {
		this.playSound(800, 0.15, 100);
		setTimeout(() => this.playSound(1000, 0.15, 100), 150);
		setTimeout(() => this.playSound(1200, 0.15, 200), 300);
	}

	playSound(frequency: number, volume: number, duration: number) {
		try {
			const audioContext =
				new (window as any).AudioContext() ||
				new (window as any).webkitAudioContext();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.frequency.value = frequency;
			oscillator.type = 'sine';

			gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(
				0.01,
				audioContext.currentTime + duration / 1000,
			);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + duration / 1000);
		} catch (e) {
			console.log('Audio not supported');
		}
	}

	triggerPartyPoppers() {
		this.showPoppers = true;
		this.poppers = [];

		const emojis = ['🎉', '🎊', '✨', '🎈', '⭐', '🌟', '💫', '🎁'];
		const popperCount = 30;

		for (let i = 0; i < popperCount; i++) {
			setTimeout(() => {
				this.poppers.push({
					id: i,
					emoji: emojis[Math.floor(Math.random() * emojis.length)],
				});
			}, i * 30);
		}

		setTimeout(() => {
			this.showPoppers = false;
		}, 3000);
	}

	handleClick(itemNumber: number) {
		if (this.winMessage) {
			return this.toastr.success(this.winMessage);
		}

		if (this.itemArray[itemNumber] === 'empty') {
			this.itemArray[itemNumber] = this.isCross ? 'cross' : 'circle';
			this.isCross = !this.isCross;
			this.playClickSound();
		} else {
			return this.toastr.info('Already filled');
		}

		this.checkIsWinner();
	}

	// t0 t1 t2
	// t3 t4 t5
	// t6 t7 t8
	checkIsWinner = () => {
		//  checking  winner of the game
		if (
			this.itemArray[0] === this.itemArray[1] &&
			this.itemArray[0] === this.itemArray[2] &&
			this.itemArray[0] !== 'empty'
		) {
			this.winMessage = `${this.itemArray[0]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[3] !== 'empty' &&
			this.itemArray[3] === this.itemArray[4] &&
			this.itemArray[4] === this.itemArray[5]
		) {
			this.winMessage = `${this.itemArray[3]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[6] !== 'empty' &&
			this.itemArray[6] === this.itemArray[7] &&
			this.itemArray[7] === this.itemArray[8]
		) {
			this.winMessage = `${this.itemArray[6]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[0] !== 'empty' &&
			this.itemArray[0] === this.itemArray[3] &&
			this.itemArray[3] === this.itemArray[6]
		) {
			this.winMessage = `${this.itemArray[0]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[1] !== 'empty' &&
			this.itemArray[1] === this.itemArray[4] &&
			this.itemArray[4] === this.itemArray[7]
		) {
			this.winMessage = `${this.itemArray[1]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[2] !== 'empty' &&
			this.itemArray[2] === this.itemArray[5] &&
			this.itemArray[5] === this.itemArray[8]
		) {
			this.winMessage = `${this.itemArray[2]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[0] !== 'empty' &&
			this.itemArray[0] === this.itemArray[4] &&
			this.itemArray[4] === this.itemArray[8]
		) {
			this.winMessage = `${this.itemArray[0]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[2] !== 'empty' &&
			this.itemArray[2] === this.itemArray[4] &&
			this.itemArray[4] === this.itemArray[6]
		) {
			this.winMessage = `${this.itemArray[2]} won`;
			this.playWinSound();
			this.triggerPartyPoppers();
		} else if (
			this.itemArray[0] !== 'empty' &&
			this.itemArray[1] !== 'empty' &&
			this.itemArray[2] !== 'empty' &&
			this.itemArray[3] !== 'empty' &&
			this.itemArray[4] !== 'empty' &&
			this.itemArray[5] !== 'empty' &&
			this.itemArray[6] !== 'empty' &&
			this.itemArray[7] !== 'empty' &&
			this.itemArray[8] !== 'empty'
		) {
			this.winMessage = 'Game Draw';
			this.isGameDraw = true;
		}
	};

	reloadGame = () => {
		this.winMessage = '';
		this.isGameDraw = false;
		this.isCross = false;
		this.itemArray = new Array(9).fill('empty');
	};
}
