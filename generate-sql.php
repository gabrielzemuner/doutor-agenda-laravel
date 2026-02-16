#!/usr/bin/env php
<?php

/*
 * Lê os arquivos de migration do Laravel e gera SQL PostgreSQL.
 * NÃO toca no banco de dados.
 *
 * Uso:
 *   php generate-sql.php
 *   php generate-sql.php > database/schema/migrations.sql
 */

$migrationPath = __DIR__ . '/database/migrations';
$files = glob($migrationPath . '/*.php');
sort($files);

$output = [];

foreach ($files as $file) {
    $content = file_get_contents($file);

    if (!preg_match("/Schema::create\s*\(\s*['\"](\w+)['\"]/", $content, $match)) {
        continue;
    }

    $tableName = $match[1];
    $columns = [];
    $constraints = [];

    // $table->id()
    if (preg_match('/\$table->id\(\)/', $content)) {
        $columns[] = '"id" bigserial primary key';
    }

    // $table->uuid('col')->primary()
    preg_match_all('/\$table->uuid\(\s*[\'"](\w+)[\'"]\s*\)->primary\(\)/', $content, $m);
    foreach ($m[1] as $col) {
        $columns[] = '"' . $col . '" uuid primary key';
    }

    // $table->uuid('col') sem ->primary()
    preg_match_all('/\$table->uuid\(\s*[\'"](\w+)[\'"]\s*\)(?!->primary)/', $content, $m);
    foreach ($m[1] as $col) {
        $pk = '"' . $col . '" uuid primary key';
        if (!in_array($pk, $columns)) {
            $columns[] = '"' . $col . '" uuid not null';
        }
    }

    // $table->foreignId('col')
    preg_match_all('/\$table->foreignId\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $nullStr = $nullable ? 'null' : 'not null';
        $columns[] = '"' . $col . '" bigint ' . $nullStr;

        $refTable = str_replace('_id', '', $col) . 's';
        $onDelete = strpos($chain, 'cascadeOnDelete') !== false ? ' on delete cascade' : '';
        $constraints[] = 'alter table "' . $tableName . '" add constraint "' . $tableName . '_' . $col . '_foreign" foreign key ("' . $col . '") references "' . $refTable . '" ("id")' . $onDelete . ';';
    }

    // $table->foreignUuid('col')
    preg_match_all('/\$table->foreignUuid\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $nullStr = $nullable ? 'null' : 'not null';
        $columns[] = '"' . $col . '" uuid ' . $nullStr;

        $refTable = str_replace('_id', '', $col) . 's';
        $onDelete = strpos($chain, 'cascadeOnDelete') !== false ? ' on delete cascade' : '';
        $constraints[] = 'alter table "' . $tableName . '" add constraint "' . $tableName . '_' . $col . '_foreign" foreign key ("' . $col . '") references "' . $refTable . '" ("id")' . $onDelete . ';';
    }

    // $table->string('col', length)
    preg_match_all('/\$table->string\(\s*[\'"](\w+)[\'"](?:\s*,\s*(\d+))?\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $len = !empty($match[2]) ? $match[2] : '255';
        $chain = $match[3];
        $nullable = strpos($chain, 'nullable()') !== false;
        $unique = strpos($chain, 'unique()') !== false;
        $def = '"' . $col . '" varchar(' . $len . ') ' . ($nullable ? 'null' : 'not null');
        if ($unique) $def .= ' unique';
        $columns[] = $def;
    }

    // $table->text('col')
    preg_match_all('/\$table->text\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" text ' . ($nullable ? 'null' : 'not null');
    }

    // $table->integer('col')
    preg_match_all('/\$table->integer\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" integer ' . ($nullable ? 'null' : 'not null');
    }

    // $table->tinyInteger('col') / $table->smallInteger('col')
    preg_match_all('/\$table->(tinyInteger|smallInteger)\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[2];
        $chain = $match[3];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" smallint ' . ($nullable ? 'null' : 'not null');
    }

    // $table->bigInteger('col')
    preg_match_all('/\$table->bigInteger\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" bigint ' . ($nullable ? 'null' : 'not null');
    }

    // $table->boolean('col')
    preg_match_all('/\$table->boolean\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" boolean ' . ($nullable ? 'null' : 'not null');
    }

    // $table->timestamp('col')
    preg_match_all('/\$table->timestamp\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" timestamp ' . ($nullable ? 'null' : 'not null');
    }

    // $table->time('col')
    preg_match_all('/\$table->time\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" time ' . ($nullable ? 'null' : 'not null');
    }

    // $table->date('col')
    preg_match_all('/\$table->date\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" date ' . ($nullable ? 'null' : 'not null');
    }

    // $table->enum('col', [...])
    preg_match_all('/\$table->enum\(\s*[\'"](\w+)[\'"],\s*\[([^\]]+)\]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[3];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" varchar(255) ' . ($nullable ? 'null' : 'not null');
    }

    // $table->json('col')
    preg_match_all('/\$table->json\(\s*[\'"](\w+)[\'"]\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $chain = $match[2];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" jsonb ' . ($nullable ? 'null' : 'not null');
    }

    // $table->decimal('col', p, s)
    preg_match_all('/\$table->decimal\(\s*[\'"](\w+)[\'"](?:\s*,\s*(\d+))?(?:\s*,\s*(\d+))?\s*\)([^;]*);/', $content, $m, PREG_SET_ORDER);
    foreach ($m as $match) {
        $col = $match[1];
        $p = !empty($match[2]) ? $match[2] : '8';
        $s = !empty($match[3]) ? $match[3] : '2';
        $chain = $match[4];
        $nullable = strpos($chain, 'nullable()') !== false;
        $columns[] = '"' . $col . '" decimal(' . $p . ',' . $s . ') ' . ($nullable ? 'null' : 'not null');
    }

    // $table->timestamps()
    if (preg_match('/\$table->timestamps\(\)/', $content)) {
        $columns[] = '"created_at" timestamp null';
        $columns[] = '"updated_at" timestamp null';
    }

    // $table->softDeletes()
    if (preg_match('/\$table->softDeletes\(\)/', $content)) {
        $columns[] = '"deleted_at" timestamp null';
    }

    // $table->rememberToken()
    if (preg_match('/\$table->rememberToken\(\)/', $content)) {
        $columns[] = '"remember_token" varchar(100) null';
    }

    // $table->primary([...]) chave composta
    if (preg_match('/\$table->primary\(\s*\[([^\]]+)\]\s*\)/', $content, $pkMatch)) {
        preg_match_all('/[\'"](\w+)[\'"]/', $pkMatch[1], $pkCols);
        $pkList = '"' . implode('", "', $pkCols[1]) . '"';
        $constraints[] = 'alter table "' . $tableName . '" add primary key (' . $pkList . ');';
    }

    if (!empty($columns)) {
        $colStr = implode(', ', $columns);
        $output[] = 'create table "' . $tableName . '" (' . $colStr . ');';
        foreach ($constraints as $c) {
            $output[] = $c;
        }
        $output[] = '';
    }
}

echo implode("\n", $output) . "\n";