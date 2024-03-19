import {
    CALENDAR_TRAINING_MODAL_WIDTH,
    CALENDAR_TRAINING_MODAL_WIDTH_MOBILE,
} from '@constants/sizes';
import dayjs from 'dayjs';

export function getSelectedCellPosition(date: dayjs.Dayjs) {
    const cell = document
        .querySelector(`[data-date="${date.format('YYYY-MM-DD')}"]`)
        ?.closest('.ant-picker-cell');

    if (cell) {
        const { top, left: cellLeft, width: cellWidth } = cell.getBoundingClientRect();
        const { left: bodyLeft } = document.body.getBoundingClientRect();

        const modalWidth = CALENDAR_TRAINING_MODAL_WIDTH;
        const bodyWidth = document.body.offsetWidth;
        const leftRelativeToBody = cellLeft - bodyLeft;

        let adjustedLeft = cellLeft + window.scrollX;
        const toMove = modalWidth - cellWidth;

        if (leftRelativeToBody + modalWidth > bodyWidth) {
            adjustedLeft -= toMove;
        }

        return {
            top: top + window.scrollY,
            left: adjustedLeft,
        };
    }

    return { top: 0, left: 0 };
}

export function getSelectedCellPositionMobile(date: dayjs.Dayjs) {
    const cell = document
        .querySelector(`[data-date="${date.format('YYYY-MM-DD')}"]`)
        ?.closest('.ant-picker-cell');

    if (cell) {
        const { top, height: cellHeight } = cell.getBoundingClientRect();

        const modalWidth = CALENDAR_TRAINING_MODAL_WIDTH_MOBILE;
        const screenWidth = window.innerWidth;

        const adjustedLeft = (screenWidth - modalWidth) / 2;

        return {
            top: top + cellHeight,
            left: adjustedLeft,
        };
    }

    return { top: 0, left: 0 };
}
