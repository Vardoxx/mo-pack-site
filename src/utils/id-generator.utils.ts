export default function idGenerator() {
	return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
