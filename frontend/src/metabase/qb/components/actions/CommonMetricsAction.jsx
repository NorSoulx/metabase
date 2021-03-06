/* @flow */

import React from "react";

import StructuredQuery from "metabase-lib/lib/queries/StructuredQuery";

import type {
    ClickAction,
    ClickActionProps
} from "metabase/meta/types/Visualization";

export default ({ question }: ClickActionProps): ClickAction[] => {
    const query = question.query();
    if (!(query instanceof StructuredQuery)) {
        return [];
    }

    return query.table().metrics.slice(0, 5).map(metric => ({
        name: "common-metric",
        title: <span>View <strong>{metric.name}</strong></span>,
        question: () => question.summarize(["METRIC", metric.id])
    }));
};
