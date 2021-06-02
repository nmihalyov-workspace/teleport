'use strict';
// Class definition

var KTDatatableDataLocal = function() {
    // Private functions
    
    var userTable = function() {
        var userTableJSONArray = JSON.parse('[' +
            '{"State": 1, "Place": "Администратор", "Fio": "Иван Иванов Иваныч", "Email": "amail@mail.ru", "Phone": "8 (950) 123-45-67", "Date": "23.02.2020", "Status": 1, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Ермаков Август Артемович", "Email": "bmail@mail.ru", "Phone": "8 (950) 123-45-68", "Date": "16.03.2020", "Status": 1,  "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Лебедев Кассиан Львович", "Email": "cmail@mail.ru", "Phone": "8 (950) 123-45-69", "Date": "01.04.2020", "Status": 2,  "Actions": null},\n' +
            '{"State": 2, "Place": "Оператор", "Fio": "Тихонов Давид Ярославович", "Email": "dmail@mail.ru", "Phone": "8 (950) 123-45-70", "Date": "27.05.2020", "Status": 2, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Марков Гордий Григорьевич", "Email": "email@mail.ru", "Phone": "8 (950) 123-45-71", "Date": "18.06.2020", "Status": 2, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Крылов Лев Ярославович", "Email": "fmail@mail.ru", "Phone": "8 (950) 123-45-72", "Date": "12.07.2020", "Status": 1, "Actions": null},\n' +
            '{"State": 2, "Place": "Оператор", "Fio": "Александров Емельян Авдеевич", "Email": "hmail@mail.ru", "Phone": "8 (950) 123-45-73", "Date": "21.08.2020", "Status": 2, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Филатов Альфред Авдеевич", "Email": "imail@mail.ru", "Phone": "8 (950) 123-45-74", "Date": "02.09.2020", "Status": 1, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Наумов Захар Антонович", "Email": "jmail@mail.ru", "Phone": "8 (950) 123-45-75", "Date": "18.10.2020", "Status": 1, "Actions": null},\n' +
            '{"State": 1, "Place": "Оператор", "Fio": "Кудряшов Алан Авксентьевич", "Email": "kmail@mail.ru", "Phone": "8 (950) 123-45-76", "Date": "01.11.2020", "Status": 2, "Actions": null},\n' +
            '{"State": 2, "Place": "Оператор", "Fio": "Шилов Адам Викторович", "Email": "lmail@mail.ru", "Phone": "8 (950) 123-45-77", "Date": "06.12.2020", "Status": 2, "Actions": null}]');

        var datatable = $('#userTable').KTDatatable({
            data: {
                type: 'local',
                source: userTableJSONArray,
                pageSize: 10,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_userTable_search_query'),
                key: 'generalSearch'
            },

            columns: [
                {
                    field: 'State',
                    title: '',
                    width: 16,
                    template: function (row) {
                        var state = {
                            1: {
                                'title': 'Активный',
                                'class': ' label-success'
                            },
                            2: {
                                'title': 'Приостановленный',
                                'class': ' label-danger'
                            }
                        };
                        return '<span class="label label-dot label-xl ' + state[row.State].class + '" title="' + state[row.State].title + '"></span>';
                    },
                },
                {
                    field: 'Fio',
                    title: 'ФИО',
                },
                {
                    field: 'Status',
                    title: 'Статус',
                    width: 136,
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Администратор',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Оператор',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label font-weight-bold ' + status[row.Status].class + ' label-inline text-nowrap">' + status[row.Status].title + '</span>';
                    },
                },
                {
                    field: 'Place',
                    title: 'Должность'
                },
                {
                    field: 'Email',
                    title: 'Email',
                    width: 120,
                },
                {
                    field: 'Phone',
                    title: 'Телефон',
                    width: 120,
                },
                {
                    field: 'Date',
                    title: 'Дата добавления',
                    type: 'date',
                    format: 'DD.MM.YYYY',
                },
                {
                    field: 'Actions',
                    title: '',
                    sortable: false,
                    width: 32,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\
                            <div class="dropdown dropdown-inline">\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <span class="svg-icon svg-icon-md">\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                <rect x="0" y="0" width="24" height="24"/>\
                                                <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                            </g>\
                                        </svg>\
                                    </span>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="navi flex-column navi-hover py-2">\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#addUser">\
                                                <span class="navi-icon"><i class="la la-edit text-primary"></i></span>\
                                                <span class="navi-text">Редактировать</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-exchange text-success"></i></span>\
                                                <span class="navi-text">Приостановить/возобновить</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#resetPass">\
                                                <span class="navi-icon"><i class="la la-lock text-warning"></i></span>\
                                                <span class="navi-text">Сбросить пароль</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#removeUser">\
                                                <span class="navi-icon"><i class="la la-trash-o text-danger"></i></span>\
                                                <span class="navi-text">Удалить</span>\
                                            </a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                        ';
                    },
                }
            ],
        });

        $('#kt_userTable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });
        $('#kt_userTable_search_status').selectpicker();
    
        $('#kt_userTable_search_state').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'State');
        });
        $('#kt_userTable_search_state').selectpicker();
    
        $('#kt_userTable_reset').on('click', function (){
            $('#kt_userTable_search_status').selectpicker('val', null);
            $('#kt_userTable_search_state').selectpicker('val', null);
            $('#kt_userTable_search_query').val('').change();
            datatable.search('', ['State', 'Status', 'generalSearch']);
        });
    };
    
    var subTable = function() {
        var userTableJSONArray = JSON.parse('[' +
            '{"State": 1, "Name": "ООО «Альфа»", "Inn": "12345678912", "Email": "termail@mail.ru", "Phone": "8 (950) 123-45-67", "Actions": null},\n' +
            '{"State": 2, "Name": "ООО «Бета»", "Inn": "25964125632", "Email": "griil@mail.ru", "Phone": "8 (950) 987-54-21", "Actions": null},\n' +
            '{"State": 1, "Name": "ОАО «Рога и Копыта»", "Inn": "32165498732", "Email": "gasmail@mail.ru", "Phone": "8 (950) 147-85-63", "Actions": null}]');
        
        var datatable = $('#subTable').KTDatatable({
            data: {
                type: 'local',
                source: userTableJSONArray,
                pageSize: 10,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_subTable_search_query'),
                key: 'generalSearch'
            },
            columns: [
                {
                    field: 'State',
                    title: '',
                    width: 16,
                    template: function (row) {
                        var state = {
                            1: {
                                'title': 'Активный',
                                'class': ' label-success'
                            },
                            2: {
                                'title': 'Приостановленный',
                                'class': ' label-danger'
                            }
                        };
                        return '<span class="label label-dot label-xl ' + state[row.State].class + '" title="' + state[row.State].title + '"></span>';
                    },
                },
                {
                    field: 'Name',
                    title: 'Наименование',
                    width: 160,
                },
                {
                    field: 'Inn',
                    title: 'ИНН',
                    width: 160,
                },
                {
                    field: 'Email',
                    title: 'Email',
                    width: 120,
                },
                {
                    field: 'Phone',
                    title: 'Телефон',
                    width: 120,
                },
                {
                    field: 'Actions',
                    title: '',
                    sortable: false,
                    width: 32,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\
                            <div class="dropdown dropdown-inline">\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <span class="svg-icon svg-icon-md">\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                <rect x="0" y="0" width="24" height="24"/>\
                                                <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                            </g>\
                                        </svg>\
                                    </span>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="navi flex-column navi-hover py-2">\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#addSub">\
                                                <span class="navi-icon"><i class="la la-edit text-primary"></i></span>\
                                                <span class="navi-text">Редактировать</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-exchange text-success"></i></span>\
                                                <span class="navi-text">Приостановить/возобновить</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#resetPass">\
                                                <span class="navi-icon"><i class="la la-lock text-warning"></i></span>\
                                                <span class="navi-text">Сбросить пароль</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#removeUser">\
                                                <span class="navi-icon"><i class="la la-trash-o text-danger"></i></span>\
                                                <span class="navi-text">Удалить</span>\
                                            </a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                        ';
                    }
                    
                    /*template: function () {
                        return '\
                            <div class="dropdown dropdown-inline">\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <span class="svg-icon svg-icon-md">\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                <rect x="0" y="0" width="24" height="24"/>\
                                                <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                            </g>\
                                        </svg>\
                                    </span>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="navi flex-column navi-hover py-2">\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#addSub">\
                                                <span class="navi-icon"><i class="la la-edit text-primary"></i></span>\
                                                <span class="navi-text">Редактировать</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#resetPass">\
                                                <span class="navi-icon"><i class="la la-lock text-warning"></i></span>\
                                                <span class="navi-text">Сбросить пароль</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-unlink text-danger"></i></span>\
                                                <span class="navi-text">Отвязать</span>\
                                            </a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                        ';
                    },*/
                }
            ],
        });
    
        $('#kt_subTable_search_state').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'State');
        });
        $('#kt_subTable_search_state').selectpicker();
    
        $('#kt_subTable_reset').on('click', function (){
            $('#kt_subTable_search_state').selectpicker('val', null);
            $('#kt_subTable_search_query').val('').change();
            datatable.search('', ['State', 'generalSearch']);
        });

        $('#tab-panel').on('hide.bs.tab', function () {
            setTimeout(function () {
                if (datatable) datatable.redraw();
            }, 250);
        });
    };
    
    var clientsTable = function() {
        var userClientsJSONArray = JSON.parse('[' +
            '{"RecordID": 1, "Org": "ООО ЗевсМейстер", "regDate": "31.01.2020", "regTime": "12:15", "Inn": "123456789012", "orgType": 1, "Region": "Республика Татарстан", "Time": "16:03", "Operator": "Белозёрова Венера Викторовна", "Comment": "Сложно сказать, почему акционеры крупнейших компаний неоднозначны и будут разоблачены.", "Actions": null},\n' +
            '{"RecordID": 2, "Org": "ОАО АльбаСтрим", "regDate": "13.02.2020", "regTime": "14:15", "Inn": "123456789013", "orgType": 2, "Region": "Московская область", "Time": "12:03", "Operator": "Андреева Кристина Ивановна", "Comment": "Кстати, некоторые особенности внутренней политики лишь добавляют фракционных разногласий и разоблачены!", "Actions": null},\n' +
            '{"RecordID": 3, "Org": "АО ЭйрАльянс", "regDate": "24.03.2021", "regTime": "15:15", "Inn": "123456789014", "orgType": 1, "Region": "Иркутской области", "Time": "11:03", "Operator": "Пономарёва Руслана Никитевна", "Comment": "Современные технологии достигли такого уровня, что базовый вектор развития позволяет выполнить важные задания по разработке дальнейших направлений развития.", "Actions": null},\n' +
            '{"RecordID": 4, "Org": "ИП ВысотаЭксперт", "regDate": "05.01.2020", "regTime": "16:15", "Inn": "123456789015", "orgType": 2, "Region": "Пермский край", "Time": "16:03", "Operator": "Андреева Кристина Ивановна", "Comment": "В рамках спецификации современных стандартов, сделанные на базе интернет-аналитики выводы объективно рассмотрены соответствующими инстанциями!", "Actions": null},\n' +
            '{"RecordID": 5, "Org": "ОАО ЭкоМедиа", "regDate": "12.11.2021", "regTime": "17:15", "Inn": "123456789016", "orgType": 1, "Region": "Красноярскому край", "Time": "14:03", "Operator": "Белозёрова Венера Викторовна", "Comment": "Мы вынуждены отталкиваться от того, что высокое качество позиционных исследований способствует подготовке и реализации экономической целесообразности принимаемых решений.", "Actions": null},\n' +
            '{"RecordID": 6, "Org": "УУУ Скатактион", "regDate": "16.07.2020", "regTime": "18:15", "Inn": "123456789017", "orgType": 1, "Region": "Камчатский край", "Time": "10:03", "Operator": "Пономарёва Руслана Никитевна", "Comment": "Есть над чем задуматься: акционеры крупнейших компаний неоднозначны и будут превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.", "Actions": null},\n' +
            '{"RecordID": 7, "Org": "ВПО СилаСпутник", "regDate": "02.05.2021", "regTime": "19:15", "Inn": "123456789018", "orgType": 2, "Region": "Забайкальский край", "Time": "12:03", "Operator": "Кабанова Капитолина Агафоновна", "Comment": "Мы вынуждены отталкиваться от того, что синтетическое тестирование предопределяет высокую востребованность инновационных методов управления процессами.", "Actions": null},\n' +
            '{"RecordID": 8, "Org": "ИП СоколЭлемент", "regDate": "15.01.2020", "regTime": "20:15", "Inn": "123456789019", "orgType": 2, "Region": "Республика Крым", "Time": "22:03", "Operator": "Пономарёва Руслана Никитевна", "Comment": "Значимость этих проблем настолько очевидна, что консультация с широким активом является качественно новой ступенью экономической целесообразности принимаемых решений!", "Actions": null},\n' +
            '{"RecordID": 9, "Org": "ООО ЕвроБагира", "regDate": "08.08.2020", "regTime": "21:15", "Inn": "123456789020", "orgType": 1, "Region": "Тверская область", "Time": "08:03", "Operator": "Белозёрова Венера Викторовна", "Comment": "Приятно, граждане, наблюдать, как элементы политического процесса заблокированы в рамках своих собственных рациональных ограничений!", "Actions": null},\n' +
            '{"RecordID": 10, "Org": "АО Армадамодерн", "regDate": "01.05.2021", "regTime": "22:15", "Inn": "123456789021", "orgType": 1, "Region": "Еврейская автономная область", "Time": "12:03", "Operator": "Белозёрова Венера Викторовна", "Comment": "Но тщательные исследования конкурентов описаны максимально подробно.", "Actions": null},\n' +
            '{"RecordID": 11, "Org": "ИО Триадавиктори", "regDate": "29.02.2021", "regTime": "23:15", "Inn": "123456789022", "orgType": 2, "Region": "Тульская область", "Time": "11:03", "Operator": "Кабанова Капитолина Агафоновна", "Comment": "Безусловно, укрепление и развитие внутренней структуры является качественно новой ступенью распределения внутренних резервов и ресурсов.", "Actions": null}]');
        
        var datatable = $('#kt_clientsTable').KTDatatable({
            data: {
                type: 'local',
                source: userClientsJSONArray,
                pageSize: 10,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_clientsTable_search_query'),
                key: 'generalSearch'
            },
            
            columns: [
                {
                    field: 'RecordID',
                    width: 20
                },
                {
                    field: 'regDate',
                    title: 'Дата добавления',
                    template: function(row) {
                        return '<span>' + row.regDate + '</span><div>' + row.regTime + '</div>';
                    },
                },
                {
                    field: 'Org',
                    title: 'Организация',
                    template: function(row) {
                        return '<span class="d-block font-weight-bolder">' + row.Org + '</span><span class="font-size-sm">ИНН: ' + row.Inn + '</span>';
                    },
                },
                /*{
                    field: 'orgType',
                    title: 'Тип организации',
                    template: function (row) {
                        var type = {
                            1: {
                                'title': 'Юридическое лицо',
                                'class': ' label-success'
                            },
                            2: {
                                'title': 'Индивидуальный предприниматель',
                                'class': ' label-info'
                            }
                        };
                        return '<span class="label label-inline font-weight-bold h-auto' + type[row.orgType].class + '">' + type[row.orgType].title + '</span>';
                    },
                },*/
                {
                    field: 'regionTime',
                    title: 'Регион и время клиента',
                    template: function(row) {
                        return '<span class="d-block font-weight-bolder">' + row.Region + '</span><span class="font-size-sm">' + row.Time + '</span>';
                    },
                },
                {
                    field: 'Operator',
                    title: 'Оператор',
                },
                {
                    field: 'Comment',
                    title: 'Комментарий',
                    template: function(row) {
                        return '<span class="font-size-sm">' + row.Comment + '</span>';
                    },
                },
                {
                    field: 'Actions',
                    title: '',
                    sortable: false,
                    width: 32,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\
                            <div class="dropdown dropdown-inline">\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <span class="svg-icon svg-icon-md">\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                <rect x="0" y="0" width="24" height="24"/>\
                                                <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                            </g>\
                                        </svg>\
                                    </span>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="navi flex-column navi-hover py-2">\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#openModal">\
                                                <span class="navi-icon"><i class="la la-window-maximize text-primary"></i></span>\
                                                <span class="navi-text">Открыть</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-vcard text-success"></i></span>\
                                                <span class="navi-text">Карточка компании</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-edit text-warning"></i></span>\
                                                <span class="navi-text">Создать заявку</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#comment">\
                                                <span class="navi-icon"><i class="la la-comment-o text-info"></i></span>\
                                                <span class="navi-text">Комментарий</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link" data-toggle="modal" data-target="#changeUnderwriter">\
                                                <span class="navi-icon"><i class="la la-exchange text-info"></i></span>\
                                                <span class="navi-text">Сменить оператора</span>\
                                            </a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                        ';
                    },
                }
            ],
        });

        $('#kt_clientsTable_search_type').on('change', function() {
            if ($(this).val().trim().length > 0) {
                datatable.search($(this).val().toLowerCase(), 'orgType');
            } else {
                datatable.search('', 'orgType');
            }
        });
        $('#regionClient').on('change', function() {
            if ($(this).val().trim().length > 0) {
                datatable.search($(this).val().toLowerCase(), 'Region');
            } else {
                datatable.search('', 'Region');
            }
        });
        $('#kt_clientsTable_search_query').on('keyup', function (){
            if ($(this).val().trim().length > 0) {
                datatable.search([$(this).val(), $(this).val()], ['Inn', 'Org']);
            } else {
                datatable.search('', ['Inn', 'Org']);
            }
        });
        $('#clientsOperators').on('changed.bs.select', function() {
            datatable.search($(this).val(), 'Operator');
        });
        $('#kt_clientsTable_search_type').selectpicker();
        $('#kt_reset_v2').on('click', function (){
            $('#kt_clientsTable_search_type').selectpicker('val', null);
            $('#regionClient').val('');
            $('#kt_clientsTable_search_query').val('');
            $('#clientsOperators').selectpicker('val', '');
            datatable.search('', ['Inn', 'Operator', 'Org', 'orgType', 'Region', 'generalSearch']);
        });
    };
    
    var requestsTable = function() {
        var requestsTableJSONArray = JSON.parse('[' +
            '{' +
                '"ID": "001",' +
                '"Client": "Шилов Адам Викторович",' +
                '"Inn": "123456789012",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 1,' +
                '"BGsum": 1200321.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На участие",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-01-01T12:01:00",' +
                '"ChangeDate": "2021-01-22T12:11:00",' +
                '"Manager": "Белозёрова Венера Викторовна",' +
                '"Comment": "Как принято считать, базовые сценарии поведения пользователей и по сей день остаются уделом либералов, которые жаждут быть разоблачены",' +
                '"Actions": null' +
            '},\n' +
	        '{' +
                '"ID": "002",' +
                '"Client": "Соболев Тимур Ефимович",' +
                '"Inn": "987654321012",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 2,' +
                '"BGsum": 479000.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На исполнение",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-06-23T12:02:00",' +
                '"ChangeDate": "2021-07-22T12:12:00",' +
                '"Manager": "Ковалёва Илона Константиновна",' +
                '"Comment": "А ещё диаграммы связей, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут указаны как претенденты на роль ключевых факторов.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "003",' +
                '"Client": "Овчинников Дмитрий Миронович",' +
                '"Inn": "13456972563132",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 3,' +
                '"BGsum": 7666666.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На возврат аванса",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-05T12:03:00",' +
                '"ChangeDate": "2021-01-22T12:12:03",' +
                '"Manager": "Романова Цветана Платоновна",' +
                '"Comment": "В целом, конечно, укрепление и развитие внутренней структуры предоставляет широкие возможности для своевременного выполнения сверхзадачи.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "004",' +
                '"Client": "Сергеев Аввакум Адольфович",' +
                '"Inn": "98798798798797",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 4,' +
                '"BGsum": 1200321.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На гарантийные обязательства",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-18T12:04:00",' +
                '"ChangeDate": "2021-01-22T12:12:13",' +
                '"Manager": "Ковалёва Илона Константиновна",' +
                '"Comment": "Также как начало повседневной работы по формированию позиции создаёт предпосылки для новых предложений.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "005",' +
                '"Client": "Нестеров Иосиф Серапионович",' +
                '"Inn": "9518476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 5,' +
                '"BGsum": 100321.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "Коммерческая БГ",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-24T12:05:00",' +
                '"ChangeDate": "2021-01-22T12:12:23",' +
                '"Manager": "Романова Цветана Платоновна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "006",' +
                '"Client": "Кошелев Савелий Константинович",' +
                '"Inn": "8628476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 6,' +
                '"BGsum": 200321.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "Коммерческая БГ",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-24T12:06:00",' +
                '"ChangeDate": "2021-01-22T12:12:33",' +
                '"Manager": "Белозёрова Венера Викторовна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "007",' +
                '"Client": "Попов Петр Созонович",' +
                '"Inn": "1678476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 7,' +
                '"BGsum": 3200321.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На участие",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-24T12:07:00",' +
                '"ChangeDate": "2021-01-22T12:12:43",' +
                '"Manager": "Романова Цветана Платоновна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "008",' +
                '"Client": "Кузьмин Аркадий Вениаминович",' +
                '"Inn": "2228476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 8,' +
                '"BGsum": 855555.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На гарантийные обязательства",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-02-24T12:08:00",' +
                '"ChangeDate": "2021-01-22T12:12:53",' +
                '"Manager": "Белозёрова Венера Викторовна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "009",' +
                '"Client": "Иванков Андрей Петрович",' +
                '"Inn": "3258476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": 9,' +
                '"BGsum": 66767,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "На исполнение",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-04-24T12:09:00",' +
                '"ChangeDate": "2021-01-22T12:13:03",' +
                '"Manager": "Ковалёва Илона Константиновна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '},\n' +
            '{' +
                '"ID": "010",' +
                '"Client": "Михайлов Михаил Михайлович",' +
                '"Inn": "7418476233",' +
                '"Requests": [5, 2, 3],' +
                '"Status": "0",' +
                '"BGsum": 67654.20,' +
                '"BGterm": "По 16.05.2022 г, 410 дн.",' +
                '"BGtype": "Коммерческая БГ",' +
                '"purchaseNum": "123456789012345678901",' +
                '"CreateDate": "2021-04-24T12:10:00",' +
                '"ChangeDate": "2021-01-22T12:14:03",' +
                '"Manager": "Романова Цветана Платоновна",' +
                '"Comment": "С учётом сложившейся международной обстановки, глубокий уровень погружения представляет собой интересный эксперимент проверки соответствующих условий активизации.",' +
                '"Actions": null' +
            '}]');
        
        var datatable = $('#kt_requestsTable').KTDatatable({
            data: {
                type: 'local',
                source: requestsTableJSONArray,
                pageSize: 10,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_requestsTable_search_client'),
                key: 'generalSearch'
            },
            columns: [
                {
                    field: 'ID',
                    title: '№ заявки',
                    template: function (row) {
                        var dateTime = new Date(row.CreateDate);
                        var day = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
                        var month = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1);
                        var date = day + '.' + month  +  '.' + dateTime.getFullYear();
                        var hour = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours();
                        var minute = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
                        var time =  hour + ':' + minute;
                        return '<a class="text-dark-75 font-weight-bolder text-hover-primary" href="#">' + row.ID + '</a>'
                          + '<div class="font-size-sm text-muted">' +date + '<br>' + time + '</div>';
                    }
                },
                {
                    field: 'Client',
                    title: 'Клиент, ИНН',
                    width: 144,
                    template: function (row) {
                        return '<a class="text-dark-75 font-weight-bolder text-hover-primary" href="#">' + row.Client + '</a>' + '<div class="font-size-sm text-muted">ИНН ' + row.Inn + '</div>';
                    }
                },
                {
                    field: 'purchaseNum',
                    title: 'Номер закупки,<br>Тип БГ',
                    width: 160,
                    template: function (row) {
                        return '<span class="font-size-sm text-nowrap">' + row.purchaseNum + '</span>' + '<div class="font-size-sm text-muted">' + row.BGtype + '</div>';
                    }
                },
                {
                    field: 'BGsum',
                    title: 'Сумма БГ, срок БГ',
                    width: 120,
                    template: function (row) {
                        return '<span class="font-size-sm text-nowrap">' + new Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                        }).format(row.BGsum) + '</span>' + '<div class="font-size-sm text-muted">' + row.BGterm + '</div>';
                    }
                },
                {
                    field: 'Status',
                    title: 'Статус',
                    width: 100,
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Черновики',
                                'class': ' label-light-dark'
                            },
                            2: {
                                'title': 'Проверка порталом',
                                'class': ' label-light-warning'
                            },
                            3: {
                                'title': 'Доработать',
                                'class': ' label-light-danger'
                            },
                            4: {
                                'title': 'В банках',
                                'class': ' label-light-info'
                            },
                            5: {
                                'title': 'Есть предложение',
                                'class': ' label-light-success'
                            },
                            6: {
                                'title': 'Согласование макета',
                                'class': ' label-light-warning'
                            },
                            7: {
                                'title': 'Предложение принято',
                                'class': ' label-light-success'
                            },
                            8: {
                                'title': 'Оплачено',
                                'class': ' label-light-info'
                            },
                            9: {
                                'title': 'Выпущено',
                                'class': ' label-light-success'
                            },
                            0: {
                                'title': 'Перевыпуск',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label label-inline font-weight-bold h-auto' + status[row.Status].class + '">' + status[row.Status].title + '</span>' + '<div class="cursor-pointer mt-4" data-toggle="modal" data-target="#requestInfo"><span class="label label-sm label-rounded label-info" title="Подано заявлений">' + row.Requests[0] + '</span> | <span class="label label-sm label-rounded label-success" title="Одобрено заявлений">' + row.Requests[1] + '</span> / <span class="label label-sm label-rounded label-danger" title="Отказано">' + row.Requests[2] + '</span></div>';
                    },
                },
                {
                    field: 'ChangeDate',
                    title: 'Последнее изменение',
                    width: 120,
                    template: function (row) {
                        var dateTimeCD = new Date(row.CreateDate);
                        var dayCD = dateTimeCD.getDate() < 10 ? '0' + dateTimeCD.getDate() : dateTimeCD.getDate();
                        var monthCD = dateTimeCD.getMonth() + 1 < 10 ? '0' + (dateTimeCD.getMonth() + 1) : (dateTimeCD.getMonth() + 1);
                        var dateCD = dayCD + '.' + monthCD  +  '.' + dateTimeCD.getFullYear();
                        var hourCD = dateTimeCD.getHours() < 10 ? '0' + dateTimeCD.getHours() : dateTimeCD.getHours();
                        var minuteCD = dateTimeCD.getMinutes() < 10 ? '0' + dateTimeCD.getMinutes() : dateTimeCD.getMinutes();
                        var timeCD =  hourCD + ':' + minuteCD;
                        return '<div class="font-size-sm">' + dateCD + '<br>' + timeCD + '</div>';
                    }
                },
                {
                    field: 'Chat',
                    title: 'Чат с банком',
                    width: 80,
                    template: function () {
                        return '<a class="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html" title="Чат с банком"><i class="flaticon2-chat-1"></i></a>';
                    }
                },
                {
                    field: 'Manager',
                    title: 'Оператор',
                    width: 120
                },
                {
                    field: 'Actions',
                    title: '',
                    sortable: false,
                    width: 32,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\
                            <div class="dropdown dropdown-inline">\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <span class="svg-icon svg-icon-md">\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                <rect x="0" y="0" width="24" height="24"/>\
                                                <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                            </g>\
                                        </svg>\
                                    </span>\
                                </a>\
                                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="navi flex-column navi-hover py-2">\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-door-open text-primary"></i></span>\
                                                <span class="navi-text">Открыть</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="/17.html#price-management" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-gear text-success"></i></span>\
                                                <span class="navi-text">Управлять ценой</span>\
                                            </a>\
                                        </li>\
                                        <li class="navi-item">\
                                            <a href="#" class="navi-link">\
                                                <span class="navi-icon"><i class="la la-user-circle-o text-danger"></i></span>\
                                                <span class="navi-text">В аккаунт клиента</span>\
                                            </a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                        ';
                    },
                }
            ],
        });

        $('#requestsEmployees').on('changed.bs.select', function() {
            datatable.search($(this).val(), 'Manager');
        });
        $('button[data-radio="status"]').on('click', function () {
            var val = $(this).data('value');
            if (typeof val === 'number') {
                datatable.search(val + '', 'Status');
            } else {
                datatable.search('', 'Status');
            }
        });
        /*$('#kt_reviewsTable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });*/
        $('#kt_reviewsTable_search_client').on('keyup', function (){
            if ($(this).val().trim().length > 0) {
                datatable.search([$(this).val(), $(this).val()], ['Inn', 'Client']);
            } else {
                datatable.search('', ['Inn', 'Client']);
            }
        });
        $('#kt_reviewsTable_search_number').on('keyup', function (){
            datatable.search($(this).val(), 'ID');
        });

        $('#kt_reviewsTable_search_purchase_num').on('keyup', function (){
            datatable.search($(this).val(), 'purchaseNum');
        });
        /*$('#kt_reviewsTable_search_status').selectpicker();*/
        $('#kt_reset').on('click', function (){
            //$('#kt_reviewsTable_search_status').selectpicker('val', null);
            $('#kt_reviewsTable_search_client').val('');
            $('#kt_reviewsTable_search_number').val('');
            $('#kt_reviewsTable_search_purchase_num').val('');
            $('#requestsEmployees').selectpicker('deselectAll');
            $('button[data-radio="status"]:first').click();
            $from.val(null);
            $to.val(null);
            $start.val(null);
            $end.val(null);
            datatable.originalDataSet = requestsTableJSONArray;
            datatable.search('', [
              'Inn', 'Client', 'Manager', 'Status', 'ID', 'generalSearch', 'purchaseNum'
            ]);
        });

        // фильтрация с подменой данных
        function filter() {
            var fromVal = $from.cleanVal() ? $from.cleanVal() / 100 : null;
            var toVal = $to.cleanVal() ? $to.cleanVal() / 100 : null;
            var startVal = $start.val() ? new Date($start.val()): null;
            var endVal = $end.val() ? new Date($end.val()): null;

            // нет подходящего метода
            var filterData = requestsTableJSONArray.filter(function (object) {
                var date = new Date(object.CreateDate);
                return ((!startVal || startVal <= date) &&
                  (!endVal || endVal >= date))
                  &&
                  ((!fromVal || fromVal <= object.BGsum) &&
                    (!toVal || toVal >= object.BGsum));
            });
            if (datatable) { // подмена ориганльного набора
                datatable.originalDataSet = filterData;
                datatable.load();
            }
        }
        var $from = $('input[name="from"]');
        var $to = $('input[name="to"]');
        $from.on('keyup', filter);
        $to.on('keyup', filter);

        var $start = $('input[name="start"]');
        var $end = $('input[name="end"]');
        $start.on('change', filter);
        $end.on('change', filter);

        if (datatable) {
            datatable.sort('ID', 'desc');
        }
    };
    
    var customersTable = function() {
        var customersTableJSONArray = JSON.parse('[' +
            '{"innkpp": "1237846180 / 921701001", "ben": "ГБУ «Рога и копыта»", "nmck": "85 107 846,30", "sum": "25532353,89", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1137846180 / 821701001", "ben": "ООО «Рога и копыта»", "nmck": "20 151 176,37", "sum": "6045352,91", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1337846180 / 721701001", "ben": "ККК «Рога и копыта»", "nmck": "34 566 958,77", "sum": "10370087,63", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1537846180 / 621701001", "ben": "ППП «Рога и копыта»", "nmck": "46 241 161,49", "sum": "13872348,45", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1637846180 / 521701001", "ben": "ОАО «Рога и копыта»", "nmck": "39 041 595,35", "sum": "11712478,61", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"}]');
        
        var datatable = $('#customersTable').KTDatatable({
            data: {
                type: 'local',
                source: customersTableJSONArray,
                pageSize: 10,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            columns: [
                {
                    field: 'RecordID',
                    title: '#',
                    sortable: false,
                    width: 20,
                    type: 'number',
                    selector: {
                        class: ''
                    },
                    textAlign: 'center',
                },
                {
                    field: 'innkpp',
                    title: 'ИНН / КПП бенефициара',
                },
                {
                    field: 'ben',
                    title: 'Наименование бенефициара',
                },
                {
                    field: 'nmck',
                    title: 'НМЦК, ₽'
                },
                {
                    field: 'sum',
                    title: 'Сумма БГ, ₽',
                    width: 144,
                    template: function (row) {
                        return '<input class="form-control input-sum" type="text" value='+ row.sum + '>';
                    }
                },
                {
                    field: 'DateStart',
                    title: 'Начало действия БГ',
                    width: 160,
                    template: function (row) {
                        return '<input type="date" class="form-control" placeholder="дд/мм/гггг" value='+ row.DateStart + ' disabled>';
                    }
                },
                {
                    field: 'DateEnd',
                    title: 'Окончание действия БГ',
                    width: 160,
                    template: function (row) {
                        return '<input type="date" class="form-control" placeholder="дд/мм/гггг" value='+ row.DateEnd + '>';
                    }
                }
            ],
        });
        if (datatable) {
            datatable.on('datatable-on-layout-updated', function () {
                KTMask.init();
            })
        }
    };
    
    var customersSelectTable = function() {
        var customersTableJSONArray = JSON.parse('[' +
            '{"innkpp": "1237846180 / 921701001", "ben": "ГБУ «Рога и копыта»", "nmck": "85 107 846,30", "sum": "25532353,89", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1137846180 / 821701001", "ben": "ООО «Рога и копыта»", "nmck": "20 151 176,37", "sum": "6045352,91", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1337846180 / 721701001", "ben": "ККК «Рога и копыта»", "nmck": "34 566 958,77", "sum": "10370087,63", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1537846180 / 621701001", "ben": "ППП «Рога и копыта»", "nmck": "46 241 161,49", "sum": "13872348,45", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"},\n' +
            '{"innkpp": "1637846180 / 521701001", "ben": "ОАО «Рога и копыта»", "nmck": "39 041 595,35", "sum": "11712478,61", "DateStart": "2021-03-29", "DateEnd": "2021-03-29"}]');
        
        var datatable = $('#customersSelectTable').KTDatatable({
            data: {
                type: 'local',
                source: customersTableJSONArray,
                pageSize: 5,
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            columns: [
                {
                    field: 'innkpp',
                    title: 'ИНН / КПП бенефициара',
                },
                {
                    field: 'ben',
                    title: 'Наименование бенефициара',
                },
                {
                    field: 'nmck',
                    title: 'НМЦК, ₽'
                },
                {
                    field: 'sum',
                    title: 'Сумма БГ, ₽',
                    width: 144,
                    template: function (row) {
                        return '<input class="form-control input-sum" type="text" value='+ row.sum + '>';
                    }
                },
                {
                    field: 'DateStart',
                    title: 'Начало действия БГ',
                    width: 160,
                    template: function (row) {
                        return '<input type="date" class="form-control" placeholder="дд/мм/гггг" value='+ row.DateStart + ' disabled>';
                    }
                },
                {
                    field: 'DateEnd',
                    title: 'Окончание действия БГ',
                    width: 160,
                    template: function (row) {
                        return '<input type="date" class="form-control" placeholder="дд/мм/гггг" value='+ row.DateEnd + '>';
                    }
                }
            ],
            rows: {
                afterTemplate: function (row, data, index) {
                    row.hover(
                      function() {$(this).addClass('bg-gray-100').css({'cursor': 'pointer'});},
                      function() {$(this).removeClass('bg-gray-100').css({'cursor': 'none'});}
                    );

                    row.on('click', function () {
										    var $table = $('[data-child="test-table"]'),
                            $tbody = $table.find('tbody');
                        if (!window.saveDataTable) {
                            window.saveDataTable = $tbody.html();
                        }
										    if (index === 0) {
										        $tbody.html(window.saveDataTable);
                        } else {
										        $tbody.html('<tr><td class="align-middle" colspan="8">смена таблицы #' + (index + 1) + '..</td></tr>');
                        }
										});
                }
            }
        });
    
        $('#tab-panel').on('hide.bs.tab', function () {
            setTimeout(function () {
                datatable.redraw();
            }, 250);
        });
        
        if (datatable) {
            datatable.on('datatable-on-layout-updated', function () {
                KTMask.init();
            })
        }
    };

    return {
        init: function() {
            userTable();
            subTable();
            clientsTable();
            requestsTable();
            customersTable();
            customersSelectTable();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableDataLocal.init();
});

//# sourceMappingURL=data-local.js.map
