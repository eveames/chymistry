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
            $table->string('name', 60);
            $table->unsignedInteger('course_id');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->string('type', 60);
            $table->string('factory', 50);
            $table->string('listService', 30);
            $table->decimal('level', 5, 2);
            $table->boolean('selected');
            $table->json('subtypes');
            $table->boolean('sequenceByID');
            $table->boolean('sequenceBySubtype');
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
