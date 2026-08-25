<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class AppointmentController extends Controller
{
    public function __construct(
        private AppointmentService $appointmentService
    ) {}

    public function index(): Response
    {
        $this->appointmentService->markAllAsRead();
        $data = $this->appointmentService->getAllForAdmin();

        return Inertia::render('Admin/Appointments', $data);
    }

    public function export()
    {
        // Ambil data statistik ringkasan
        $stats = $this->appointmentService->getDashboardStats();
        
        // Ambil semua pendaftar
        $appointments = Appointment::orderBy('created_at', 'desc')->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Daftar Pendaftar Demo');

        // Pastikan gridlines terlihat
        $sheet->setShowGridlines(true);

        // Header Title
        $sheet->setCellValue('A1', 'LAPORAN DATA PENDAFTAR DEMO SMART EXAM');
        $sheet->mergeCells('A1:G1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FF1E293B'));
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $sheet->setCellValue('A2', 'Tanggal Cetak: ' . now()->locale('id')->translatedFormat('d F Y H:i:s'));
        $sheet->mergeCells('A2:G2');
        $sheet->getStyle('A2')->getFont()->setItalic(true)->setSize(10)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FF64748B'));
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // ────────────────────────────────────────────────────────
        // BAGIAN 1: RINGKASAN DATA PENDAFTAR
        // ────────────────────────────────────────────────────────
        $sheet->setCellValue('A4', 'RINGKASAN PENDAFTAR');
        $sheet->mergeCells('A4:C4');
        $sheet->getStyle('A4')->getFont()->setBold(true)->setSize(12)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FF0F172A'));

        $sheet->setCellValue('A5', 'Metrik Ringkasan');
        $sheet->setCellValue('B5', 'Jumlah');
        $sheet->getStyle('A5:B5')->getFont()->setBold(true)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FFFFFFFF'));
        $sheet->getStyle('A5:B5')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF3B82F6'); // Blue 500

        $sheet->setCellValue('A6', 'Total Seluruh Pendaftar');
        $sheet->setCellValue('B6', $stats['totalAppointments']);

        $sheet->setCellValue('A7', 'Pendaftar Hari Ini');
        $sheet->setCellValue('B7', $stats['todayAppointments']);

        $sheet->setCellValue('A8', 'Pendaftar Baru (Belum Dibaca)');
        $sheet->setCellValue('B8', $stats['unreadAppointments']);

        $sheet->setCellValue('A9', 'Jadwal Demo Mendatang');
        $sheet->setCellValue('B9', $stats['scheduledAppointments']);

        // Styling tabel ringkasan
        $summaryBorder = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FFCBD5E1'], // Slate 300
                ],
            ],
        ];
        $sheet->getStyle('A5:B9')->applyFromArray($summaryBorder);
        $sheet->getStyle('B6:B9')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // ────────────────────────────────────────────────────────
        // BAGIAN 2: DAFTAR LENGKAP PENDAFTAR
        // ────────────────────────────────────────────────────────
        $startRow = 12;
        $sheet->setCellValue('A' . ($startRow - 1), 'DETAIL LENGKAP PENDAFTAR');
        $sheet->mergeCells('A' . ($startRow - 1) . ':G' . ($startRow - 1));
        $sheet->getStyle('A' . ($startRow - 1))->getFont()->setBold(true)->setSize(12)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FF0F172A'));

        $headers = ['No', 'Nama Pendaftar', 'Email', 'No. WhatsApp', 'Institusi / Sekolah', 'Jadwal Demo', 'Tanggal Mendaftar'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . $startRow, $header);
            $col++;
        }

        $headerRange = 'A' . $startRow . ':G' . $startRow;
        $sheet->getStyle($headerRange)->getFont()->setBold(true)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('FFFFFFFF'));
        $sheet->getStyle($headerRange)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF1E293B'); // Slate 800
        $sheet->getStyle($headerRange)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $row = $startRow + 1;
        $no = 1;
        foreach ($appointments as $appointment) {
            $sheet->setCellValue('A' . $row, $no++);
            $sheet->setCellValue('B' . $row, $appointment->name);
            $sheet->setCellValue('C' . $row, $appointment->email);
            // WhatsApp dengan format teks agar zero-padding tidak hilang
            $sheet->setCellValueExplicit('D' . $row, $appointment->whatsapp, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
            $sheet->setCellValue('E' . $row, $appointment->institution);
            $sheet->setCellValue('F' . $row, $appointment->scheduled_at ? $appointment->scheduled_at->format('d-m-Y H:i') : '-');
            $sheet->setCellValue('G' . $row, $appointment->created_at ? $appointment->created_at->format('d-m-Y H:i') : '-');

            // Alignment
            $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('D' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $sheet->getStyle('F' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('G' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            // Row striping (subtle background for even rows)
            if ($row % 2 === 0) {
                $sheet->getStyle('A' . $row . ':G' . $row)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFF8FAFC'); // Slate 50
            }

            $row++;
        }

        // Border daftar pendaftar
        $sheet->getStyle('A' . $startRow . ':G' . ($row - 1))->applyFromArray($summaryBorder);

        // Auto-fit column widths
        foreach (range('A', 'G') as $colLetter) {
            $sheet->getColumnDimension($colLetter)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);
        $filename = 'Pendaftar_Demo_Smart_Exam_' . now()->format('Ymd_His') . '.xlsx';

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');

        $writer->save('php://output');
        exit;
    }

    public function destroy(int $id): RedirectResponse
    {
        $result = $this->appointmentService->delete($id);

        return back()->with($result['success'] ? 'success' : 'error', $result['message']);
    }
}
