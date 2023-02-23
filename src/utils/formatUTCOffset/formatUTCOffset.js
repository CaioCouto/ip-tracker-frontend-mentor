export default function formatUTCOffset(offset) {
    const r = Math.abs(offset).toString().padStart(2, '0');
    return offset < 0 ? '-'+r : r;
}