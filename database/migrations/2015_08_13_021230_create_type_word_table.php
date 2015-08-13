<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeWordTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('type_word', function (Blueprint $table) {
            $table->unsignedInteger('word_id');
            $table->foreign('word_id')->references('id')->on('words');
            $table->unsignedInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('type_word');
    }
}
