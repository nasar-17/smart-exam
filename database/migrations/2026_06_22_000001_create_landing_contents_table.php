<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('landing_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section', 50);
            $table->string('key', 100);
            $table->longText('value')->nullable();
            $table->string('type', 20)->default('text');
            $table->string('label', 100)->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->unique(['section', 'key']);
            $table->index('section');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_contents');
    }
};
