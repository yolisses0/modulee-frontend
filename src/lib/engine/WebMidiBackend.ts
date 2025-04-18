import { WebMidi, type NoteMessageEvent } from 'webmidi';
import type { AudioBackend } from './AudioBackend';

export class WebMidiBackend {
	webMidi?: typeof WebMidi;

	constructor(public audioBackend: AudioBackend) {}

	async initialize() {
		this.webMidi = await WebMidi.enable();
		// Brute force of keeping stuff updated.
		//
		// TODO find a more elegant solution, maybe allowing users to select
		// devices.
		this.webMidi.addListener('midiaccessgranted', this.updateDeviceListeners);
		this.webMidi.addListener('connected', this.updateDeviceListeners);
		this.webMidi.addListener('disabled', this.updateDeviceListeners);
		this.updateDeviceListeners();
	}

	updateDeviceListeners = () => {
		// Removes the possible previous listeners to prevent duplicate event
		// handling
		this.webMidi?.inputs.forEach((device) => {
			device.removeListener('noteon', this.onNoteOn);
			device.addListener('noteon', this.onNoteOn);

			device.removeListener('noteoff', this.onNoteOff);
			device.addListener('noteoff', this.onNoteOff);
		});
	};

	async destroy() {
		this.webMidi?.disable();
	}

	onNoteOn = (e: NoteMessageEvent) => {
		this.audioBackend?.setNoteOn(e.note.number);
	};

	onNoteOff = (e: NoteMessageEvent) => {
		this.audioBackend?.setNoteOff(e.note.number);
	};
}
