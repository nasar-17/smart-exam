import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface ImageCropModalProps {
    isOpen: boolean;
    imageSrc: string;
    onCrop: (croppedFile: File) => void;
    onCancel: () => void;
}

export default function ImageCropModal({ isOpen, imageSrc, onCrop, onCancel }: ImageCropModalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0); // in degrees: 0, 90, 180, 270
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Reset settings when modal opens or imageSrc changes
    useEffect(() => {
        if (isOpen && imageSrc) {
            setZoom(1);
            setRotation(0);
            setOffset({ x: 0, y: 0 });
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                imageRef.current = img;
                drawCanvas();
            };
        }
    }, [isOpen, imageSrc]);

    // Redraw whenever parameters change
    useEffect(() => {
        drawCanvas();
    }, [zoom, rotation, offset]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        // Move origin to center of canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Apply rotation
        ctx.rotate((rotation * Math.PI) / 180);

        // Apply zoom and offsets
        ctx.scale(zoom, zoom);

        // Calculate aspect ratio fit
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;

        // Draw image centered at the translated origin + drag offsets
        // Account for rotation when applying offsets so dragging feels natural
        const rad = (rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        // Transform the offset based on rotation so dragging direction matches hand movement
        const tx = offset.x * cos + offset.y * sin;
        const ty = -offset.x * sin + offset.y * cos;

        ctx.drawImage(img, -w / 2 + tx, -h / 2 + ty, w, h);
        ctx.restore();
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        canvasRef.current?.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDragging) return;
        setOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        setIsDragging(false);
        canvasRef.current?.releasePointerCapture(e.pointerId);
    };

    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        // Create a 1:1 high resolution output canvas
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = 400;
        outputCanvas.height = 400;
        const oCtx = outputCanvas.getContext('2d');
        if (!oCtx) return;

        oCtx.save();
        // Move origin to center of output canvas
        oCtx.translate(200, 200);
        oCtx.rotate((rotation * Math.PI) / 180);
        oCtx.scale(zoom, zoom);

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;

        // Since canvas coordinate layout matches output canvas center scale
        const rad = (rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const tx = offset.x * cos + offset.y * sin;
        const ty = -offset.x * sin + offset.y * cos;

        oCtx.drawImage(img, -w / 2 + tx, -h / 2 + ty, w, h);
        oCtx.restore();

        // Convert output canvas to Blob and File
        outputCanvas.toBlob((blob) => {
            if (blob) {
                const croppedFile = new File([blob], 'cropped-avatar.jpg', { type: 'image/jpeg' });
                onCrop(croppedFile);
            }
        }, 'image/jpeg', 0.95);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onCancel(); }}>
            <DialogContent className="max-w-md bg-[#151d2a] border-slate-800 rounded-2xl shadow-xl text-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-center text-slate-100" style={{ fontFamily: "'Sora', sans-serif" }}>
                        Sesuaikan Foto Profil
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center p-4">
                    {/* Crop Viewport Box */}
                    <div className="relative w-[300px] h-[300px] rounded-xl overflow-hidden bg-slate-950/60 border border-slate-800 flex items-center justify-center shadow-inner cursor-move">
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            className="w-full h-full object-cover touch-none"
                        />
                        {/* Circular 1:1 crop mask overlay */}
                        <div className="absolute inset-0 pointer-events-none border-2 border-blue-500 rounded-full shadow-[0_0_0_9999px_rgba(15,23,42,0.7)]" />
                    </div>

                    {/* Zoom Control Slider */}
                    <div className="w-full mt-6 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                            <span className="flex items-center gap-1.5"><ZoomOut className="w-3.5 h-3.5" /> Zoom</span>
                            <span>{Math.round(zoom * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRotate}
                            className="rounded-xl border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <RotateCw className="w-4 h-4 mr-1.5" />
                            Putar Gambar
                        </Button>
                    </div>
                </div>

                <DialogFooter className="border-t border-slate-800/80 pt-4 mt-2 flex justify-between gap-3 sm:gap-0">
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="ghost"
                        className="rounded-xl font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    >
                        <X className="w-4 h-4 mr-1.5" />
                        Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-5"
                    >
                        <Check className="w-4 h-4 mr-1.5" />
                        Selesai
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
