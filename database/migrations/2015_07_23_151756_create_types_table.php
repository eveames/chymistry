<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50)->unique();
            $table->unsignedInteger('course');
            $table->foreign('course')->references('course_id')->on('courses');
            $table->string('type', 20);
            $table->string('factory', 20);
            $table->decimal('level', 5, 2);
            $table->boolean('selected');
            $table->json('subtypes');
            $table->boolean('sequenceByID');
            $table->string('priorityCalcAlgorithm', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('types');
    }
}
