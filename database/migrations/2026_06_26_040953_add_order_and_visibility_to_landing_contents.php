<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('landing_contents', function (Blueprint $table) {
            // Add Section level global order and visibility meta-attributes.
            // We use nullable or default values to avoid breaking existing data.
            $table->integer('section_order')->default(0);
            $table->boolean('is_visible')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landing_contents', function (Blueprint $table) {
            $table->dropColumn(['section_order', 'is_visible']);
        });
    }
};
